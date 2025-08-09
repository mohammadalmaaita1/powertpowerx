
'use client';

import Link from "next/link";
import { RadioTower, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


function LoginForm() {
  return (
    <>
      <div className="grid gap-4">
        <div className="grid gap-2" suppressHydrationWarning>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            defaultValue="admin@telepowerx.com"
          />
        </div>
        <div className="grid gap-2" suppressHydrationWarning>
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href="#"
              className="ml-auto inline-block text-sm underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input id="password" type="password" required defaultValue="password" />
        </div>
        <Button asChild type="submit" className="w-full">
          <Link href="/dashboard">Login <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="#" className="underline">
          Sign up
        </Link>
      </div>
    </>
  );
}


export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40 p-4">
      <Card className="mx-auto max-w-sm w-full shadow-2xl">
        <CardHeader className="text-center">
          <div className="inline-flex justify-center items-center mb-4">
            <RadioTower className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline">TelePowerX</CardTitle>
          <CardDescription>
            Enter your credentials to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
