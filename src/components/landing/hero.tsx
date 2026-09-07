import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";

export function Hero() {
  return (
    <section className="px-8 py-24">
      <h1 className="max-w-2xl text-6xl font-medium leading-tight">
        Idle hardware, put to work.
      </h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">
        Rent out spare compute or find affordable machines for training jobs.
      </p>
      <Button className="mt-8" variant="outline">
        See how it works
        <ArrowRightIcon weight="regular" className="ml-2" size={16} />
      </Button>
    </section>
  );
}
