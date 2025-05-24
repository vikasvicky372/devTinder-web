import { format } from 'date-fns';

export const formattingTime = (isoString) => {
const formattedTime = format(new Date(isoString), 'h:mm a'); 

return formattedTime.toLowerCase().replace("pm", "p.m.").replace("am", "a.m.");
}
