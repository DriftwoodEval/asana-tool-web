import ClientList from "~/app/_components/clientList";

export default async function Page({
	params,
}: {
	params: Promise<{ name: string }>;
}) {
	const { name } = await params;

	return <ClientList name={name} />;
}
