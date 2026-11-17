export const VERIFY_ROLES = [
  {
    value: 'Psychiatrist / Doctor',
    label: 'Psychiatrist / Doctor (NMC / SMC)',
    field: 'NMC / State Council Registration No.',
    placeholder: 'e.g., GMC-48291',
    council: 'State Medical / Academic Council',
  },
  {
    value: 'PG Resident (MD/DNB)',
    label: 'PG Resident — MD / DNB (MBBS / SMC)',
    field: 'NMC / State Council Registration No.',
    placeholder: 'e.g., GMC-48291',
    council: 'State Medical / Academic Council',
  },
  {
    value: 'Clinical Psychologist (RCI)',
    label: 'Clinical Psychologist (RCI CRR)',
    field: 'RCI CRR Registration Number',
    placeholder: 'e.g., A78412',
    council: 'RCI Central Register',
  },
  {
    value: 'Allied Mental Health',
    label: 'Counsellor / Nurse / Social Worker',
    field: 'College ID / Degree Certificate No.',
    placeholder: 'e.g., BJMC-2023-084',
    council: 'State Medical / Academic Council',
  },
  {
    value: 'Medical Student',
    label: 'Medical Student (College ID)',
    field: 'College ID / Degree Certificate No.',
    placeholder: 'e.g., BJMC-2023-084',
    council: 'State Medical / Academic Council',
  },
]

export const INITIAL_REQUESTS = [
  {
    id: 'v1',
    name: 'Dr. Vikramaditya Desai',
    role: 'Psychiatrist · Rx Ads Eligible',
    council: 'Gujarat Medical Council',
    regNo: 'G-51920',
    submitted: '2h ago',
    status: 'pending',
  },
  {
    id: 'v2',
    name: 'Sneha Nair',
    role: 'Clinical Psychologist',
    council: 'RCI Central Register',
    regNo: 'A89431',
    submitted: '5h ago',
    status: 'pending',
  },
  {
    id: 'v3',
    name: 'Dr. Aarav Joshi',
    role: 'PG Resident (MD Psychiatry) · Rx Ads Eligible',
    council: 'Maharashtra Medical Council',
    regNo: 'MMC-2024/04912',
    submitted: 'Yesterday',
    status: 'pending',
  },
]

export function fieldForRole(value) {
  return VERIFY_ROLES.find((role) => role.value === value) ?? VERIFY_ROLES[0]
}
