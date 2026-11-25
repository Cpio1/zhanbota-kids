import { I18nProvider } from "@/lib/i18n";
import { UiProvider } from "@/lib/ui";
import { getAboutImage, getGalleryPhotos, getHeroImage, getHeroVideo, getMascots } from "@/lib/media";
import { MascotProvider } from "@/components/mascot/Mascot";
import { Header } from "@/components/Header";
import { SkipLink } from "@/components/SkipLink";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Groups } from "@/components/sections/Groups";
import { Nutrition } from "@/components/sections/Nutrition";
import { Gallery } from "@/components/sections/Gallery";
import { Documents } from "@/components/sections/Documents";
import { Contacts } from "@/components/sections/Contacts";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { JsonLd } from "@/components/JsonLd";

// Медиафайлы определяются во время сборки: достаточно положить файлы в /public и пересобрать сайт.
export default function Page() {
  const heroImage = getHeroImage();
  const heroVideo = getHeroVideo();
  const aboutImage = getAboutImage();
  const gallery = getGalleryPhotos();
  const mascots = getMascots();

  return (
    <I18nProvider>
      <UiProvider>
        <MascotProvider files={mascots}>
          <SkipLink />
          <Header />
          <main id="main">
            <Hero image={heroImage} video={heroVideo} />
            <About photo={aboutImage} />
            <Groups />
            <Nutrition />
            <Gallery photos={gallery} />
            <Documents />
            <Contacts />
          </main>
          <Footer />
          <WhatsAppFloat />
          <JsonLd image={heroImage?.src} />
        </MascotProvider>
      </UiProvider>
    </I18nProvider>
  );
}
