import ForceLightMode from '@/components/ForceLightMode';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen w-full bg-[#FFF9F2] flex items-center justify-center p-4 md:p-8">
      <ForceLightMode />
      {/* Wrapper utama yang menjaga lebar maksimal agar tetap proporsional */}
      <div className="w-full max-w-[620px] flex justify-center items-center">
        {children}
      </div>
    </main>
  );
}