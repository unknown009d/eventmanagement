export default function Page({ params }: { params: { slug: string } }) {
  return <p className="text-lg opacity-80">Post: <strong>{params.slug}</strong> in development</p>
}