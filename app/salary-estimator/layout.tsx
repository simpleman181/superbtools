import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Salary Estimator — MyToolMate',
  description: 'Estimate take-home salary after tax, PF and other payroll deductions.',
  openGraph: {
    title: 'Salary Estimator — MyToolMate',
    description: 'Estimate take-home salary after tax, PF and other payroll deductions.',
    url: 'https://www.mytoolmate.top/salary-estimator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
