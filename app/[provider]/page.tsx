import { ESPS } from "@/lib/esps"
import ProviderClient from "./provider-client"

export function generateStaticParams() {
  return ESPS.map((e) => ({ provider: e.id }))
}

export default function ProviderPage() {
  return <ProviderClient />
}
