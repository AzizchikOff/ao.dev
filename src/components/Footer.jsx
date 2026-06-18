import { useTranslation } from "react-i18next";
import "./Footer.css";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer>
      <div className="wrap footer-inner">
        <span>{t("footer.copy")}</span>
        <span>{t("footer.built")}</span>
      </div>
    </footer>
  );
}
