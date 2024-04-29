"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { validateText } from "@/lib/utils"
import { currentUser, useUser } from "@clerk/nextjs"
import { CloudUpload, LoaderCircle, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import { toast } from "sonner"

export default function Post() {
  let [img, setImg] = useState<File>()
  let [btn, setBtn] = useState(false)
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [cemail, setCemail] = useState<string | undefined>(undefined);

  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (isLoaded || isSignedIn) {
      const emailaddress = user?.emailAddresses[0].toString();
      setUsername(user?.username || user?.firstName || emailaddress?.split("@")[0])
      setUsername(emailaddress)
    }
  }, [isLoaded, isSignedIn, user]);

  const route = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setBtn(true)

    try {
      const formData = new FormData(e.currentTarget);
      const title = formData.get('title');
      const date = formData.get('date');
      if (img) formData.append("img", img);
      if (date) formData.append('edate', date)
      if (username) formData.append('creator', username)
      if (cemail) formData.append('cemail', cemail)

      const postevent = await fetch("/api/post/", {
        method: 'POST',
        body: formData
      })

      if (!postevent.ok) throw new Error(await postevent.text())

      const res = await postevent.json()

      console.log(res)

      if (res.success == true) {
        toast.success("Event posted", {
          description: `Your ${title} event is created successfully.`,
        })
        route.push('/myposts')
      } else toast.error("Event Creation Error", {
        description: res.message
      })
    } catch (error: any) {
      toast.error("Internal Error", {
        description: error
      })
      console.error(error)
    }

    setBtn(false)
  }

  return (
    <div className="w-full px-6 mb-24">
      <div className="w-full mb-8">
        <h2 className="text-2xl font-bold">Event Creation</h2>
        <p className="text-sm opacity-50">Fill up the details to publish an event</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <Label htmlFor="title">Post Title</Label>
          <Input type="text" name="title" id="title" onChange={validateText} placeholder="eg. Event Title" required />
        </div>
        <div>
          <Label htmlFor="details">Details</Label>
          <Textarea name="details" id="details" maxLength={600} placeholder="Write a long description here..." required ></Textarea>
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input type="text" name="location" id="location" placeholder="eg. Delhi, Faridabad" required />
        </div>
        <div>
          <Label htmlFor="cdnt">
            Latitude & Longitude &nbsp;
            <abbr className="text-xs opacity-60" title="(Open google maps and right click on the pin point location and click on the first option to copy and paste it here)">know more</abbr>
          </Label>
          <Input type="text" name="cdnt" id="cdnt" placeholder="eg. 28.4523818577495, 77.28138503684717" />
        </div>
        <div className="flex gap-2 w-full">
          <div className="w-full">
            <Label htmlFor="date">Date</Label>
            <Input type="date" name="date" id="date" title="Date of the event" required />
          </div>
          <div className="w-full">
            <Label htmlFor="Time">Time</Label>
            <Input type="time" name="time" id="time" title="Time of the event" required />
          </div>
        </div>
        <div>
          <Label htmlFor="picture">Picture</Label>
          <Input type="file" name="date" id="picture" accept=".jpg,.png,.webp,.gif" onChange={e => setImg(e.target.files?.[0])} />
          <label htmlFor="picture">
            <div className="mt-2 w-full aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
              {img == null
                ? <div className="flex flex-col justify-center items-center gap-2">
                  <CloudUpload size={48} className="opacity-30" />
                  <p className="opacity-50 text-sm">Select to upload image</p>
                </div>
                :
                <img src={URL.createObjectURL(img).toString()} className="w-full object-cover" alt="Image Preview" />
              }
            </div>
          </label>
        </div>
        <div className="mt-5 flex justify-end">
          <Button type="submit" className="flex items-center justify-between gap-2" disabled={btn}>
            Create a post
            {
              !btn ?
                <Plus size={16} />
                : <LoaderCircle size={16} className="animate-spin" />
            }

          </Button>
        </div>
      </form>
    </div>
  )
}
