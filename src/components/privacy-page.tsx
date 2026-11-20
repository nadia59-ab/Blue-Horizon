import { getTranslations } from "next-intl/server";
import SiteHeader from "@/components/site-header";
import PageHeader from "@/components/page-header";
import { PageEntrance } from "@/components/motion";

export default async function PrivacyPage() {
  const t = await getTranslations();

  return (
    <PageEntrance className="inner-page">
      <SiteHeader />
      <PageHeader title={t("footer.privacyPolicy")} />
      <section className="privacy-content section-pad" aria-labelledby="privacy-demo-heading">
        <h2 id="privacy-demo-heading">{t("privacyPage.heading")}</h2>
        <p>{t("privacyPage.body")}</p>
        <h2 id="delete-data">{t("privacyPage.deleteHeading")}</h2>
        <p>{t("privacyPage.deleteBody")}</p>
      </section>
    </PageEntrance>
  );
}
