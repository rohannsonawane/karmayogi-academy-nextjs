import Header from "@/components/website/Header";
import Footer from "@/components/website/Footer";
import WhatsAppButton from "@/components/website/WhatsAppButton";
import ReCaptchaProvider from "@/components/providers/ReCaptchaProvider";
import { getSiteSettings } from "@/lib/queries/settings";

export default async function WebsiteLayout({ children }) {
  const settings = await getSiteSettings();
  return (
    <ReCaptchaProvider>
      <Header logoUrl={settings?.logo_url || null} />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton phoneNumber={settings?.whatsapp} />
    </ReCaptchaProvider>
  );
}
