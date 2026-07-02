import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Heading, Body } from "@/components/ui/typography";
import { Lock } from "@phosphor-icons/react/dist/ssr";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-canvas-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-sm p-8 text-center">
        <div className="size-14 rounded-2xl bg-status-alert-light flex items-center justify-center mx-auto mb-5">
          <Lock size={28} weight="fill" className="text-status-alert" />
        </div>
        <Heading as="h3">Access Denied</Heading>
        <Body size="meta" muted className="mt-2">
          You do not have permission to access this area. If you believe this is
          a mistake, contact your administrator.
        </Body>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 bg-text-primary text-white hover:bg-text-primary/90 active:scale-[0.98] text-[13px] px-4 py-2 rounded-pill"
          >
            Go Home
          </Link>
        </div>
      </Card>
    </div>
  );
}
