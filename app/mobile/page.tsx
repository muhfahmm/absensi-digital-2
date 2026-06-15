import type { Metadata } from "next";
import MobileHomePage from "./index";

export const metadata: Metadata = {
  title: "Absensi Mobile",
  description: "Halaman utama aplikasi mobile absensi digital.",
};

export default function MobilePage() {
  return <MobileHomePage />;
}
