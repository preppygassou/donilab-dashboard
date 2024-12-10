export interface Site {
  id: string
  name: {
    en: string
    fr: string
  }
  description: {
    en: string
    fr: string
  }
  slogan: {
    en: string
    fr: string
  }
  logo: {
    url: string
  }
  status: 'ACTIVE' | 'INACTIVE'
  createdAt: string
  updatedAt: string
}

export interface Hub {
  id: string
  title: {
    en: string
    fr: string
  }
  description: {
    en: string
    fr: string
  }
  logo: {
    url: string
  }
  status: 'ACTIVE' | 'INACTIVE'
  siteId: string
  createdAt: string
  updatedAt: string
  galerie?: Array<{
    url: string
  }>
  summary?: {
    title: {
      en: string
      fr: string
    }
    description: {
      en: string
      fr: string
    }
  }
  specificities?: Array<{
    title: {
      en: string
      fr: string
    }
    description: {
      en: string
      fr: string
    }
    image: {
      en: string
      fr: string
    }
  }>
  services?: Array<{
    id: string
    icon: {
      url: string
    }
    iconHover: {
      url: string
    }
    title: {
      en: string
      fr: string
    }
    description: {
      en: string
      fr: string
    }
  }>
}

export interface Program {
  id: number
  logo: {
    url: string
  }
  title: {
    en: string
    fr: string
  }
  description: {
    en: string
    fr: string
  }
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  duration: {
    value: number
    unit: 'days' | 'weeks' | 'months' | 'years'
  }
  galerie: Array<{
    url: string
  }>
  objectif: {
    global: Array<{
      en: string
      fr: string
    }>
    specifiques: Array<{
      en: string
      fr: string
    }>
  }
  targets: Array<{
    en: string
    fr: string
    value: number
  }>
  goals: Array<{
    en: string
    fr: string
    status: 'pending' | 'in_progress' | 'completed'
  }>
  activities: Array<{
    en: string
    fr: string
    startDate: string
    endDate: string
    status: 'planned' | 'in_progress' | 'completed' | 'cancelled'
  }>
  results: Array<{
    en: string
    fr: string
    indicator: {
      en: string
      fr: string
    }
    achieved: number
    target: number
  }>
  slug?: {
    en: string
    fr: string
  }
  siteId?: string
  hubId?: string
  programTypeId: string
  createdAt: string
  updatedAt: string
}

export interface Media {
  id: string
  type?: string
  name: string
  link: string
  hubId?: string
  siteId?: string
  createdAt: string
  updatedAt: string
}

declare type FileType = "document" | "image" | "video" | "audio" | "other";
