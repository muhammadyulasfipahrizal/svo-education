import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export type IEventItem = {
    id: number;
    name: string;
    location: string;
    date: Date | string;
    ticket_prize: number;
    description: string;
}
export const useEventsStore = defineStore('events', () => {
    const allEvent = ref<IEventItem[]>([
        {
            id: 1,
            name: 'Network Technology Seminar',
            location: 'Bukit Bintang',
            date: new Date(),
            ticket_prize: 9.99,
            description: 'The world of network technology is constantly evolving, with new advancements and innovations being introduced every year. To stay up-to-date with the latest trends, it is essential to attend a seminar that covers the most recent developments in this field. Our network technology seminar is designed to do just that!|'
        }])
    const updateEvent = (index: number, form: IEventItem) => allEvent.value = allEvent.value.map((v, x) => index === x ? { ...form } : v)

    return { allEvent, updateEvent }
})
