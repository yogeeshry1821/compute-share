"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Plus, Trash, Play, Stop } from "@phosphor-icons/react";
import { getMachines, createMachine, deleteMachine, updateMachineStatus } from "@/app/actions/machines";

type Machine = {
  id: string;
  name: string;
  status: string;
  gpuModel: string;
  vramGb: number;
  cpuCores: number;
  ramGb: number;
  hourlyRate: number;
  location: string | null;
  createdAt: string;
};

export default function MachinesPage() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function init() {
      const res = await getMachines();
      if (!cancelled && "machines" in res) {
        setMachines(res.machines as Machine[]);
      }
      if (!cancelled) {
        setLoading(false);
      }
    }
    init();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const res = await createMachine(formData);
    setSubmitting(false);
    if (!("error" in res)) {
      setOpen(false);
      await reload();
    }
  }

  async function handleDelete(id: string) {
    await deleteMachine(id);
    await reload();
  }

  async function handleStatusToggle(id: string, currentStatus: string) {
    const newStatus = currentStatus === "online" ? "offline" : "online";
    await updateMachineStatus(id, newStatus);
    await reload();
  }

  async function reload() {
    const res = await getMachines();
    if ("machines" in res) {
      setMachines(res.machines as Machine[]);
    }
  }

  const statusColors: Record<string, string> = {
    online: "bg-green-100 text-green-800 border-green-200",
    offline: "bg-gray-100 text-gray-800 border-gray-200",
    busy: "bg-yellow-100 text-yellow-800 border-yellow-200",
    error: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <div className="py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Machines</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your compute machines and their status.
          </p>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 size-4" />
              Add Machine
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add Machine</SheetTitle>
            </SheetHeader>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  name="name"
                  required
                  className="mt-1 w-full rounded-none border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">GPU Model</label>
                <input
                  name="gpuModel"
                  required
                  className="mt-1 w-full rounded-none border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">VRAM (GB)</label>
                  <input
                    name="vramGb"
                    type="number"
                    required
                    min={1}
                    className="mt-1 w-full rounded-none border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">CPU Cores</label>
                  <input
                    name="cpuCores"
                    type="number"
                    required
                    min={1}
                    className="mt-1 w-full rounded-none border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">RAM (GB)</label>
                  <input
                    name="ramGb"
                    type="number"
                    required
                    min={1}
                    className="mt-1 w-full rounded-none border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Hourly Rate ($)</label>
                  <input
                    name="hourlyRate"
                    type="number"
                    step="0.01"
                    required
                    min={0}
                    className="mt-1 w-full rounded-none border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Location</label>
                <input
                  name="location"
                  className="mt-1 w-full rounded-none border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <SheetFooter>
                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? "Saving..." : "Add Machine"}
                </Button>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      {loading ? (
        <div className="mt-8 text-sm text-muted-foreground">Loading machines...</div>
      ) : machines.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-sm text-muted-foreground">
            No machines configured yet. Click &quot;Add Machine&quot; to get started.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {machines.map((machine) => (
            <Card key={machine.id} size="sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{machine.name}</CardTitle>
                    <CardDescription>{machine.gpuModel}</CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className={`border ${statusColors[machine.status] || statusColors.offline}`}>
                    {machine.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">VRAM</span>
                    <p className="font-medium">{machine.vramGb} GB</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">CPU</span>
                    <p className="font-medium">{machine.cpuCores} cores</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">RAM</span>
                    <p className="font-medium">{machine.ramGb} GB</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Rate</span>
                    <p className="font-medium">${machine.hourlyRate.toFixed(2)}/hr</p>
                  </div>
                </div>
                {machine.location && (
                  <p className="mt-4 text-xs text-muted-foreground">{machine.location}</p>
                )}
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => handleStatusToggle(machine.id, machine.status)}>
                    {machine.status === "online" ? (
                      <Stop className="size-3.5" />
                    ) : (
                      <Play className="size-3.5" />
                    )}
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon-sm"
                    onClick={() => handleDelete(machine.id)}>
                    <Trash className="size-3.5" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
