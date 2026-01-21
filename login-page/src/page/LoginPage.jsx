import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Checkbox} from "@/components/ui/checkbox.jsx";

const loginSchema = z.object({
    email: z.string().min(1, "Email is required").pipe(z.email("Invalid email address")),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    rememberMe: z.boolean().default(false)
})

export function LoginPage() {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: {errors}
    } = useForm({resolver: zodResolver(loginSchema), defaultValues: {rememberMe: false}});

    const rememberMe = watch("rememberMe");

    const submittedData = data => {
        console.log(data); // backend operation can be performed here
        reset()
    }

    return (
        <form className="w-full max-w-sm space-y-4 rounded-2xl border p-6 shadow-lg"
              onSubmit={handleSubmit(submittedData)}
              noValidate
        >
            <h1 className="text-2xl font-semibold">Login</h1>

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="you@example.com"
                />
                {errors.email && (
                    <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    {...register("password")}
                />
                {errors.password && (
                    <p className="text-sm text-red-600">{errors.password.message}</p>
                )}
            </div>

            <div className="flex items-center gap-2">
                <Checkbox
                    id="rememberMe"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setValue("rememberMe", checked === true)}
                />
                <Label htmlFor="rememberMe">Remember me</Label>
            </div>

            <Button type="submit" className="w-full">Sign in</Button>
        </form>
    )
}