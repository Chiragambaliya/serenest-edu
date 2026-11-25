"""ChocoHugz signature chocolate mould - parametric STL generator.

Outputs, per size (6in / 8in):
  *_mould.stl          direct 3D-printable mould (cavity is the chocolate, face down)
  *_master.stl         positive "chocolate" master, for casting a food-grade silicone mould
  *_pour_box.stl       open-top cup the master sits in while silicone is poured

All units mm. Run: python3 make_mould.py
"""
import math, sys
import numpy as np
from manifold3d import Manifold, CrossSection, FillRule
from matplotlib.textpath import TextPath
from matplotlib.font_manager import FontProperties
from shapely.geometry import LineString, Point, Polygon

FONT_SCRIPT = "/tmp/fonts/Pacifico.ttf"
FONT_SANS = "/tmp/fonts/Montserrat-SemiBold.ttf"
IN = 25.4


# ---------- 2D helpers ----------
def cs_from_shapely(geom):
    polys = [geom] if geom.geom_type == "Polygon" else list(geom.geoms)
    contours = []
    for p in polys:
        contours.append(np.asarray(p.exterior.coords)[:-1])
        contours += [np.asarray(r.coords)[:-1] for r in p.interiors]
    return CrossSection(contours, FillRule.EvenOdd)


def text_cs(txt, font, height, cx, cy, width=None, spacing=0.0):
    """Text as CrossSection, scaled so cap/glyph height = height (or fit width), centred."""
    fp = FontProperties(fname=font)
    if spacing:  # manual letter spacing for the tagline
        pieces, x = [], 0.0
        bar = TextPath((0, 0), "|", size=100, prop=fp).get_extents().width
        for ch in txt:
            if ch == " ":
                x += 32 + spacing * 100
                continue
            pieces.append(TextPath((x, 0), ch, size=100, prop=fp))
            adv = TextPath((0, 0), ch + "|", size=100, prop=fp).get_extents().width - bar
            x += adv + spacing * 100
        contours = [p for tp in pieces for p in tp.to_polygons(closed_only=True)]
    else:
        contours = TextPath((0, 0), txt, size=100, prop=fp).to_polygons(closed_only=True)
    contours = [np.asarray(c)[:-1] for c in contours if len(c) > 3]
    cs = CrossSection(contours, FillRule.NonZero)
    (x0, y0, x1, y1) = cs.bounds()
    s = height / (y1 - y0) if width is None else width / (x1 - x0)
    cs = cs.scale((s, s))
    (x0, y0, x1, y1) = cs.bounds()
    return cs.translate((cx - (x0 + x1) / 2, cy - (y0 + y1) / 2))


def heart_outline(cx, cy, size, stroke):
    t = np.linspace(0, 2 * math.pi, 240, endpoint=False)
    x = 16 * np.sin(t) ** 3
    y = 13 * np.cos(t) - 5 * np.cos(2 * t) - 2 * np.cos(3 * t) - np.cos(4 * t)
    k = size / 32.0
    ring = LineString(np.c_[cx + x * k, cy + y * k + 1.0 * k].tolist() + [[cx + x[0] * k, cy + y[0] * k + k]])
    return cs_from_shapely(ring.buffer(stroke / 2, resolution=12))


def fluted_disc(R, n_flutes, depth, pts_per_flute=12):
    th = np.linspace(0, 2 * math.pi, n_flutes * pts_per_flute, endpoint=False)
    r = R - depth * (0.5 - 0.5 * np.cos(n_flutes * th))
    return CrossSection([np.c_[r * np.cos(th), r * np.sin(th)]])


# ---------- the chocolate (positive) ----------
def chocolate(D, H, relief):
    R = D / 2
    k = D / (6 * IN)                       # scale factor relative to 6in design
    flutes = int(round(48 * k / 4) * 4)
    base = fluted_disc(R, flutes, 1.4 * k)
    # body with ~2 deg draft: top (decorated face) slightly smaller so it releases
    draft = (R - H * math.tan(math.radians(2))) / R
    body = Manifold.extrude(base, H, n_divisions=1, scale_top=(draft, draft))

    Rt = R * draft                          # top-face radius
    deco = CrossSection()
    # scalloped (wavy) border ring
    th = np.linspace(0, 2 * math.pi, 900, endpoint=False)
    rw = 0.80 * Rt + 0.03 * Rt * np.sin(16 * th)
    wave = LineString(np.c_[rw * np.cos(th), rw * np.sin(th)].tolist() + [[rw[0], 0]])
    deco += cs_from_shapely(wave.buffer(1.1 * k, resolution=10))

    # logo
    deco += text_cs("ChocoHugz", FONT_SCRIPT, None, 0, 0.06 * Rt, width=1.18 * Rt)
    deco += heart_outline(0, 0.42 * Rt, 0.17 * Rt, 1.1 * k)
    # (R) mark
    rx, ry = 0.66 * Rt, 0.27 * Rt
    ring = Point(rx, ry).buffer(0.055 * Rt, resolution=24).difference(Point(rx, ry).buffer(0.055 * Rt - 0.7 * k, resolution=24))
    deco += cs_from_shapely(ring) + text_cs("R", FONT_SANS, 0.05 * Rt, rx, ry)
    # tagline with side rules
    tag = text_cs("UNWRAP HAPPINESS", FONT_SANS, 0.065 * Rt, 0, -0.30 * Rt, spacing=0.08)
    deco += tag
    tx0, _, tx1, _ = tag.bounds()
    for x0, x1 in [(tx0 - 0.17 * Rt, tx0 - 0.05 * Rt), (tx1 + 0.05 * Rt, tx1 + 0.17 * Rt)]:
        deco += CrossSection.square((x1 - x0, 0.8 * k)).translate((x0, -0.30 * Rt - 0.4 * k))

    raised = Manifold.extrude(deco, relief + 0.2).translate((0, 0, H - 0.2))
    return body + raised, Rt


def build(size_in):
    D, H = size_in * IN, 1.5 * IN
    k = D / (6 * IN)
    relief = 1.2 * k
    choc, Rt = chocolate(D, H, relief)
    R = D / 2
    name = f"chocohugz_{size_in}in"

    # 1) direct-print mould: chocolate flipped face-down inside a cup with a grip flange
    floor, wall, flange_w, flange_t = 3.0, 3.0, 6.0, 3.0
    cavity = choc.rotate((180, 0, 0)).translate((0, 0, H + relief + floor))
    top = H + relief + floor
    outer = Manifold.cylinder(top, R + wall, R + wall, 256)
    flange = Manifold.cylinder(flange_t, R + wall + flange_w, R + wall + flange_w, 256).translate((0, 0, top - flange_t))
    cut = cavity + Manifold.extrude(fluted_disc(R, int(round(48 * k / 4) * 4), 1.4 * k), 5).translate((0, 0, top - 0.01))
    mould = (outer + flange) - cut

    # 2) master + pour box for silicone casting (10 mm silicone all round)
    gap = 10.0
    bi, bt = R + gap, H + relief + gap
    box = Manifold.cylinder(bt + 2, bi + 2.4, bi + 2.4, 256) - Manifold.cylinder(bt + 5, bi, bi, 256).translate((0, 0, 2))
    # shallow locating pocket in the box floor keeps the master centred
    box = box - Manifold.cylinder(1.2, R + 0.3, R + 0.3, 256).translate((0, 0, 0.8))

    out = {}
    for tag, m in [("mould", mould), ("master", choc), ("pour_box", box)]:
        mesh = m.to_mesh()
        out[tag] = (mesh.vert_properties[:, :3].copy(), mesh.tri_verts.copy())
        write_stl(f"{name}_{tag}.stl", *out[tag])
        print(f"{name}_{tag}.stl  tris={len(mesh.tri_verts)}  vol={m.volume()/1000:.1f} cm3  genus={m.genus()}")
    print(f"   chocolate volume {choc.volume()/1000:.0f} cm3 ~ {choc.volume()/1000*1.3:.0f} g chocolate")
    return out


def write_stl(path, V, F):
    tri = V[F]
    n = np.cross(tri[:, 1] - tri[:, 0], tri[:, 2] - tri[:, 0])
    n /= np.linalg.norm(n, axis=1, keepdims=True) + 1e-12
    rec = np.zeros(len(F), dtype=[("n", "<f4", 3), ("v", "<f4", (3, 3)), ("a", "<u2")])
    rec["n"], rec["v"] = n, tri
    with open(path, "wb") as f:
        f.write(b"ChocoHugz mould".ljust(80, b" "))
        f.write(np.uint32(len(F)).tobytes())
        f.write(rec.tobytes())


if __name__ == "__main__":
    import pickle
    res = {s: build(s) for s in (6, 8)}
    pickle.dump(res, open("/tmp/meshes.pkl", "wb"))
