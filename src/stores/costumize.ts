import { ref } from 'vue'
import { defineStore } from 'pinia'

export type ICostumize = {
    id: number;
    color: string;
    title: string;
    description: string
}

  export const useCostumizeStore = defineStore('costumize', () => {
    const allCostumize = ref<ICostumize[]>([
      {
        id: 1,
        color: '#62314C',
        title: 'Video Marketing Specialist',
        description: '“Fueling brand growth through compelling videos that captivate, engage, and drive conversions, delivering measurable results that surpass expectations.”'
      },
      {
        id: 2,
        color: '#A22822',
        title: 'Visual Content Specialist',
        description: '“Crafting mesmerizing visuals that ignite emotions, amplify brand messaging, and create unforgettable experiences that resonate with audiences.”'
      },
      {
        id: 3,
        color: '#337B49',
        title: 'Product Specialist',
        description: '“Mastering the intricacies of products, providing unparalleled expertise, and delivering exceptional solutions that exceed customer expectations.”'
      },
      {
        id: 4,
        color: '#60768F',
        title: 'Ad Campaign Strategist',
        description: '“Architecting strategic campaigns that break boundaries, captivate audiences, and drive remarkable results, redefining success in the realm of advertising.”'
      },
      {
        id: 5,
        color: '#61A093',
        title: 'Customer Relations Specialist',
        description: '“Excelling in fostering positive relationships, resolving issues, and delivering exceptional service as a Customer Relations Specialist.”'
      },
      {
        id: 6,
        color: '#00588B',
        title: 'Leadership Development Specialist',
        description: '“Empowering individuals, unlocking potential, and driving organizational growth as a top-notch Leadership Development Specialist.”'
      }, 
      {
        id: 7,
        color: '#8B5322',
        title: 'Social Media Marketing Strategist',
        description: '“Crafting captivating campaigns, driving engagement, and achieving remarkable results as a Social Media Marketing Strategist."'
      }
    ])

    const updateCostumize = (index: Number, form: ICostumize) => allCostumize.value = allCostumize.value.map((v, x) => index === x ? { ...form } : v)
    return { updateCostumize, allCostumize }
  })