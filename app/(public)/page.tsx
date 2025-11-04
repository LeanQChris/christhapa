import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Vortex } from "@/components/ui/vortex";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <section className="">
        <Vortex
          className="min-h-screen flex items-center justify-center px-8 py-20"
          baseHue={280}
          backgroundColor="#000000"
        >
          <div className="max-w-4xl w-full">
            <div className="mb-8">
              <h1 className="text-6xl font-bold mb-4 text-white">
                Hi, I&apos;m Chris 👋
              </h1>
              <TextGenerateEffect
                className="text-xl text-gray-300"
                words="A skilled software engineer with expertise in Next.js, React, and Flutter. I'm passionate about building engaging user experiences and bringing deep technical knowledge to both web and mobile development."
              />
            </div>
          </div>
        </Vortex>
      </section>
    </div>
  );
}
