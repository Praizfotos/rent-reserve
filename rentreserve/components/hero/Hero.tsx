import HeroCopy from "./HeroCopy";
import HeroProduct from "./HeroProduct";

export default function Hero() {
  return (
    <section
      id="product"
      className="relative min-h-[760px] pt-32 pb-24 md:pb-32 overflow-hidden"
      aria-label="Hero"
    >
      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 60% 0%, rgba(0,0,0,0.02) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Copy — cols 1–6 */}
          <div className="lg:col-span-6 xl:col-span-5">
            <HeroCopy />
          </div>

          {/* Product visualization — cols 7–12 */}
          <div className="lg:col-span-6 xl:col-span-7 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[560px] pb-8">
              <HeroProduct />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
