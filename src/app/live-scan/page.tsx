import { redirect } from "next/navigation";

// The photo flow on /diagnose replaces the old live-camera screen.
export default function LiveScanPage() {
  redirect("/diagnose");
}
