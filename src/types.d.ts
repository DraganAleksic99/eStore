export type ProductsAndCategoriesState = {
    categories: string[]
    products: Product[]
}

export type Product = {
    id: number
    name: string
    category: string
    description: string
    price: number
}