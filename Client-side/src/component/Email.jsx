service_yi62c5o
import { useState } from "react";
import { Button, Input, Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui";
import emailjs from 'emailjs-com';

const EmailSender = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleSendEmail = () => {
    const serviceId = "service_yi62c5o";      // מזהה השירות מ-EmailJS
    const templateId = "your_template_id";    // מזהה התבנית מ-EmailJS
    const userId = "your_user_id";            // מזהה המשתמש שלך מ-EmailJS

    const templateParams = {
      to_email: email,
      message: "הפרטים שברצונך לשלוח במייל!"
    };

    emailjs.send(serviceId, templateId, templateParams, userId)
      .then(() => {
        alert("המייל נשלח בהצלחה!");
        setOpen(false);
      })
      .catch((error) => {
        alert("שגיאה בשליחת המייל: " + error.text);
      });
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>שלח פרטים במייל</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>הזן כתובת מייל</DialogHeader>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
          />
          <DialogFooter>
            <Button onClick={handleSendEmail}>שלח</Button>
            <Button variant="secondary" onClick={() => setOpen(false)}>ביטול</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmailSender;
