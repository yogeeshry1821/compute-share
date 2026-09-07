import {
  DesktopIcon,
  ArrowsLeftRightIcon,
  CoinsIcon,
} from "@phosphor-icons/react/ssr";

const steps = [
  {
    number: "01",
    icon: DesktopIcon,
    title: "List your hardware",
    description:
      "Add your machine's specs and set your hourly rate. Takes about two minutes.",
  },
  {
    number: "02",
    icon: ArrowsLeftRightIcon,
    title: "Get matched to a job",
    description:
      "When someone needs compute that fits your machine, we send the job your way.",
  },
  {
    number: "03",
    icon: CoinsIcon,
    title: "Get paid",
    description:
      "Usage is metered automatically and paid out per hour of compute time.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border px-8 py-24">
      <h2 className="text-2xl font-medium">How it works</h2>

      <div className="mt-12 grid gap-12 md:grid-cols-3">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.number}>
              <div className="flex items-center gap-3">
                <Icon size={20} weight="regular" />
                <span className="font-mono text-sm text-muted-foreground">
                  {step.number}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-medium">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}