import request, { gql } from 'graphql-request';
import { BlogsType } from 'src/interfaces/blog.interface';
import { CategoriesType } from 'src/interfaces/categories.interface';

const graphqlAPI = process.env.NEXT_PUBLIC_HYPOGRAPH_ENDPOINT as string;

export const BlogsService = {
	async getAllBlogs() {
		const query = gql`
			query GetBlogs {
				blogs {
					excerpt
					id
					title
					slug
					notion
					createdAt
					image {
						url
					}
					description {
						text
					}
					docs {
						url
					}
					author {
						avatar {
							url
						}
						name
					}
				}
			}
		`;

		const result = await request<{ blogs: BlogsType[] }>(graphqlAPI, query);
		return result.blogs;
	},

	async getLatestBlog() {
		const query = gql`
			query GetLatestBlogs {
				blogs(last: 2) {
					createdAt
					id
					slug
					title
					notion
					image {
						url
					}
					description {
						text
					}
					author {
						name
						avatar {
							url
						}
					}
				}
			}
		`;
		const result = await request<{ blogs: BlogsType[] }>(graphqlAPI, query);
		return result.blogs;
	},

	async getCategories() {
		const query = gql`
			query GetCategories {
				categories {
					label
					slug
				}
			}
		`;

		const result = await request<{ categories: CategoriesType[] }>(graphqlAPI, query);
		return result.categories;
	},

	async getDetailedBlog(slug: string) {
		const query = gql`
			query GetDetailBlog($slug: String!) {
				blog(where: { slug: $slug }) {
					excerpt
					id
					slug
					title
					createdAt
					notion
					image {
						url
					}
					description {
						text
						html
					}
					docs {
						url
					}
					author {
						name
						avatar {
							url
						}
					}
					category {
						label
						slug
					}
				}
			}
		`;

		const result = await request<{ blog: BlogsType }>(graphqlAPI, query, { slug });
		return result.blog;
	},

	async getDetailedCategorisBlog(slug: string) {
		const query = gql`
			query GetDetailCategoriesBlog($slug: String!) {
				blogs(where: { category: { slug: $slug } }) {
					id
					excerpt
					createdAt
					title
					slug
					notion
					author {
						name
						avatar {
							url
						}
					}
					description {
						text
					}
					image {
						url
					}
					docs {
						url
					}
				}
			}
		`;

		const result = await request<{ blogs: BlogsType[] }>(graphqlAPI, query, { slug });
		return result.blogs;
	},

	async getCategoriesBlog() {
		const query = gql`
			query getCategoriesBlog {
				categories {
					label
					blogs {
						title
						notion
						id
					}
					id
				}
			}
		`;

		const result = await request<{ categories: CategoriesType[] }>(graphqlAPI, query);
		return result;
	},

	async getBlog() {
		const query = gql`
			query getBlog {
				categories {
					blogs {
						title
						id
						createdAt
						excerpt
						slug
						image {
							url
						}
						description {
							text
						}
						category {
							label
							slug
						}
						author {
							name
							avatar {
								url
							}
						}
					}
				}
			}
		`;

		const result = await request<{ categories: CategoriesType[] }>(graphqlAPI, query);
		return result.categories;
	},
};
