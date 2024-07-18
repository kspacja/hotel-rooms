import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { Room } from "@/api/types";

export default function RoomCard({
  room,
  children,
}: {
  room: Room;
  children?: React.ReactNode;
}) {
  return (
    <Card className="min-h-[95px]">
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
      </CardHeader>
      <CardFooter className="flex-col items-start sm:items-center sm:flex-row gap-2">
        {children}
      </CardFooter>
    </Card>
  );
}
