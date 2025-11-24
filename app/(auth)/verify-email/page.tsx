import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verify Your Email</CardTitle>
          <CardDescription>
            We&apos;ve sent a verification email to your inbox
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Please check your email and click the verification link to activate
            your account. If you don&apos;t see the email, check your spam folder.
          </p>

          <div className="flex flex-col gap-2">
            <Button asChild>
              <Link href="/login">Go to Login</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/register">Resend Verification Email</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
