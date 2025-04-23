import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "./actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function REGISTER({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const errorMessage = (await searchParams).error;

  console.log(errorMessage);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="px-8 w-1/3">
        <CardTitle className="text-lg">Register</CardTitle>
        <CardDescription>
          Enter your email and password to register
        </CardDescription>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {errorMessage}
          </div>
        )}

        <form className="grid grid-cols-1 gap-4">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="johndoe@example.com"
          ></Input>

          <Label htmlFor="password">
            Password: Min 7 characters, 1 letter, 1 symbol
          </Label>
          <Input
            name="password"
            className="px-4"
            id="password"
            type="password"
          ></Input>

          <Label htmlFor="confirmed-password">Re-enter Password</Label>
          <Input
            name="confirmed-password"
            id="confirmed-password"
            type="password"
          ></Input>

          <Button formAction={register}>Register</Button>
        </form>

        <div className="text-center">
          <p>
            Already have an account?{" "}
            <Link className="font-medium underline" href="/login">
              Login
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
