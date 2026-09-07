import { Button } from "@/components/ui/button";
import { HouseIcon, RocketLaunchIcon } from "@phosphor-icons/react/ssr";

export function Audiences() {
  return (
    <section className="border-t border-border px-8 py-24">
      <div className="grid gap-px overflow-hidden rounded-lg border border-border md:grid-cols-2">
        <div className="bg-card p-10">
          <HouseIcon size={24} weight="regular" />
          <h3 className="mt-6 text-xl font-medium">Have spare hardware?</h3>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Turn a machine that&apos;s sitting idle into a small, steady
            source of income. You control when it&apos;s available.
          </p>
          <Button className="mt-6" variant="outline">
            List your machine
          </Button>
        </div>

        <div className="bg-card p-10">
          <RocketLaunchIcon size={24} weight="regular" />
          <h3 className="mt-6 text-xl font-medium">Need compute for a job?</h3>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Submit a training job and get matched to available hardware,
            often for less than a cloud provider would charge.
          </p>
          <Button className="mt-6" variant="outline">
            Submit a job
          </Button>
        </div>
      </div>
    </section>
  );
}
