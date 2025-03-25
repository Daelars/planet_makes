import Navbar from "@/components/Navigation/Main/Navigation";
import { ScreenFitText } from "@/components/Text/Fit";
export default function NewArrivalsPage() {
  return (
    <>
      <Navbar />
      <div className="h-screen bg-gradient-to-r from-zinc-100 to-neutral-200 p-6">
        {/* <h1 className="p-6 text-center text-7xl">New Arrivals!</h1> */}
        <ScreenFitText
          text="New Arrivals!"
          containerClassName="flex items-center justify-center"
          textClassName="font-[family-name:var(--font-ultra)] text-black tracking-tighter leading-none"
        />
      </div>
    </>
  );
}
