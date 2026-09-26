"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";

export async function getMachines() {
  const session = await auth.api.getSession({ headers: {} });
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const machines = await prisma.machine.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return { machines };
}

export async function createMachine(formData: FormData) {
  const session = await auth.api.getSession({ headers: {} });
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const name = formData.get("name") as string;
  const gpuModel = formData.get("gpuModel") as string;
  const vramGb = parseInt(formData.get("vramGb") as string, 10);
  const cpuCores = parseInt(formData.get("cpuCores") as string, 10);
  const ramGb = parseInt(formData.get("ramGb") as string, 10);
  const hourlyRate = parseFloat(formData.get("hourlyRate") as string);
  const location = formData.get("location") as string | null;

  if (!name || !gpuModel || isNaN(vramGb) || isNaN(cpuCores) || isNaN(ramGb) || isNaN(hourlyRate)) {
    return { error: "Invalid input" };
  }

  const machine = await prisma.machine.create({
    data: {
      userId: session.user.id,
      name,
      gpuModel,
      vramGb,
      cpuCores,
      ramGb,
      hourlyRate,
      location: location || "",
      status: "offline",
    },
  });

  return { machine };
}

export async function deleteMachine(id: string) {
  const session = await auth.api.getSession({ headers: {} });
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  await prisma.machine.deleteMany({
    where: { id, userId: session.user.id },
  });

  return { success: true };
}

export async function updateMachineStatus(id: string, status: string) {
  const session = await auth.api.getSession({ headers: {} });
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const machine = await prisma.machine.updateMany({
    where: { id, userId: session.user.id },
    data: {
      status,
      lastSeenAt: status === "online" ? new Date() : null,
    },
  });

  return { machine };
}
