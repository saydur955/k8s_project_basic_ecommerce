export interface ty_facilities_item {
  index: string;
  img: string;
  title: {
    txt: string;
    color: 'primary'| 'secondary'
  }[]
}

export const facilities_item_data: ty_facilities_item[] = [

  {
    index: 'facilities_music',
    img: "/images/home/facilities_music.png",
    title: [
      {
        txt: "Enjoy your food",
        color: 'primary'
      },
      {
        txt: "with guitar violin",
        color: 'secondary'
      },
      {
        txt: "show",
        color: 'primary'
      }
    ]
  },

  {
    index: 'facilities_wifi',
    img: "/images/home/facilities_wifi.png",
    title: [
      {
        txt: "Access",
        color: 'secondary'
      },
      {
        txt: "Of fulltime free",
        color: 'secondary'
      },
      {
        txt: "Unlimited WIFI",
        color: 'primary'
      },
    ]
  },

  {
    index: 'facilities_animation',
    img: "/images/home/facilities_animation.png",
    title: [
      {
        txt: "Explore our",
        color: 'primary'
      },
      {
        txt: "animated show",
        color: 'primary'
      },
      {
        txt: "with your kid",
        color: 'secondary'
      },
    ]
  },

  {
    index: 'facilities_magazine',
    img: "/images/home/facilities_magazine.png",
    title: [
      {
        txt: "Discover our",
        color: 'secondary'
      },
      {
        txt: "collection of",
        color: 'primary'
      },
      {
        txt: "Magazines",
        color: 'secondary'
      },
    ]
  },

  {
    index: 'facilities_cineplex',
    img: "/images/home/facilities_cineplex.png",
    title: [
      {
        txt: "Enjoy our",
        color: 'secondary'
      },
      {
        txt: "mini size",
        color: 'primary'
      },
      {
        txt: "free cineplex",
        color: 'primary'
      },
    ]
  },

]
