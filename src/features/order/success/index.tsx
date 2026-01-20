import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/shared/ui/button/ButtonLink";

type Props = { id?: string };

export default async function OrderSuccessPage({ id }: Props) {
  const t = await getTranslations("orderSuccess");

  return (
    <section
      className="mx-auto px-4 py-20 text-center md:max-w-md"
      aria-labelledby="order-success-title"
    >
      <div>
        <h1 id="order-success-title" className="text-2xl font-bold mb-4">
          {t("title")}
        </h1>

        <p className="text-gray-600 mb-2">{t("desc")}</p>

        {id && (
          <p className="text-sm text-gray-500 mb-6">
            {t("orderId")}: <span className="font-mono">{id}</span>
          </p>
        )}

        <div className="flex flex-col md:flex-row justify-center gap-3">
          <ButtonLink href="/" variant="outline" full className="md:w-auto">
            {t("toHome")}
          </ButtonLink>

          <ButtonLink
            href="/account/orders"
            variant="primary"
            full
            className="md:w-auto"
          >
            {t("toOrders")}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
