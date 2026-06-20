import { AppLayout } from "@/components/layout/app-layout";
import { Card } from "@/components/ui/card";
import { Heading, Body, Meta, Label } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import {
  User,
  Shield,
  Bell,
  Eye,
  SignOut,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="animate-in">
          <div className="flex items-center gap-2 mb-1">
            <Sparkle size={16} weight="fill" className="text-brand-accent" />
            <Label>Settings</Label>
          </div>
          <Heading as="h1">Account & Preferences</Heading>
          <Meta className="mt-1.5">
            Manage your account, appearance, and study preferences
          </Meta>
        </div>

        <div className="max-w-2xl space-y-4 animate-in animate-in-delay-1">
          <Card padding="list" variant="default">
            <div className="flex items-center gap-3 mb-5">
              <div className="size-10 rounded-[10px] bg-brand-accent-subtle flex items-center justify-center">
                <User size={20} weight="fill" className="text-brand-accent-dark" />
              </div>
              <Heading as="h5">Profile</Heading>
            </div>
            <div className="space-y-4">
              <div>
                <Body size="sm" className="mb-1.5">Username</Body>
                <div className="w-full rounded-[10px] border border-border px-4 py-2.5 text-[14px] font-semibold bg-surface-card text-text-primary">
                  priyanshgfounder1501
                </div>
              </div>
              <Button variant="outline" size="sm">Edit Profile</Button>
            </div>
          </Card>

          <Card padding="list" variant="default">
            <div className="flex items-center gap-3 mb-5">
              <div className="size-10 rounded-[10px] bg-brand-accent-subtle flex items-center justify-center">
                <Eye size={20} weight="fill" className="text-brand-accent-dark" />
              </div>
              <Heading as="h5">Appearance</Heading>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <Body size="sm">Theme</Body>
                <select className="rounded-[8px] border border-border px-3 py-1.5 text-[12px] font-semibold bg-surface-card text-text-primary">
                  <option>Light</option>
                  <option>Dark</option>
                  <option>System</option>
                </select>
              </div>
            </div>
          </Card>

          <Card padding="list" variant="default">
            <div className="flex items-center gap-3 mb-5">
              <div className="size-10 rounded-[10px] bg-brand-accent-subtle flex items-center justify-center">
                <Bell size={20} weight="fill" className="text-brand-accent-dark" />
              </div>
              <Heading as="h5">Notifications</Heading>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <Body size="sm">Study reminders</Body>
                <div className="size-5 rounded-[5px] border-2 border-brand-accent bg-brand-accent flex items-center justify-center">
                  <span className="text-white text-[10px]">✓</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <Body size="sm">Weekly progress report</Body>
                <div className="size-5 rounded-[5px] border-2 border-border" />
              </div>
            </div>
          </Card>

          <Card padding="list" variant="default">
            <div className="flex items-center gap-3 mb-5">
              <div className="size-10 rounded-[10px] bg-status-alert-light flex items-center justify-center">
                <Shield size={20} weight="fill" className="text-status-alert" />
              </div>
              <Heading as="h5">Account</Heading>
            </div>
            <div className="space-y-3">
              <Button variant="alert" size="sm">
                <SignOut size={14} weight="fill" />
                Logout
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
