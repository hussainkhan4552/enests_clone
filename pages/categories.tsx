import React from "react";
import { Tab } from "@headlessui/react";
import Container from "@components/layout/Container";
import cn from "classnames";
import { useQuery } from "@apollo/client";
import { CATEGORIES_QUERY } from "@graphql/queries/getCategories";
import Link from "next/link";
import Layout from "@components/layout/Layout";
const Categories = () => {
  const { data, loading, error } = useQuery(CATEGORIES_QUERY);

  return (
    <Layout>
      <Container>
        <main className="h-full w-full inline-grid  md:grid md:grid-cols-3 md:gap-x-8 font-lato text-secondary-400">
          <Tab.Group>
            <aside className="w-full py-8 px-4 shadow-lg col-span-2 md:col-span-1">
              <h3 className=" text-2xl font-lato text-secondary-400 mb-10 md:mb-0">
                View Category
              </h3>

              {/* <Tab.List
              as="select"
              className="md:hidden w-full mt-4 focus:ring-primary ring-1 outline-none ring-secondary-400 py-1 rounded-sm"
              >
              {data &&
                data.categories &&
                data.categories.map(({ name, icon }, idx) => (
                  <Tab as="option" key={idx}>
                  <span>{name}</span>
                  </Tab>
                  ))}
                </Tab.List> */}

              <Tab.List className="flex-col  md:flex items-start mt-10">
                {data &&
                  data.categories &&
                  data.categories.map(({ name, icon }, idx) => (
                    <Tab
                      key={idx}
                      className={({ selected }) =>
                        cn(
                          "w-full py-3 px-4 text-secondary-400 text-left",
                          selected ? "bg-primary text-white outline-none" : ""
                        )
                      }
                    >
                      <div className="flex justify-between items-center">
                        <span className="space-x-2">
                          <i className={icon} />
                          <span className=" truncate">{name}</span>
                        </span>
                        <i className="fas fa-angle-right ml-auto" />
                      </div>
                    </Tab>
                  ))}
              </Tab.List>
            </aside>
            <section className="w-full col-span-2">
              <Tab.Panels>
                {data &&
                  data.categories &&
                  data.categories.map(({ subCategories, name }, i) => (
                    <Tab.Panel key={i}>
                      <div className="py-10 px-4 shadow-lg">
                        <div className="pb-8 border-b border-secondary-200">
                          <h3 className=" text-2xl text-primary ">{name}</h3>
                        </div>
                        <div className="pt-4 grid grid-cols-2 xl:grid-cols-3 gap-x-3">
                          {subCategories &&
                            subCategories.map(({ name, icon }, i) => (
                              <Link key={i} href="/">
                                <a>
                                  <p className="mb-3 hover:underline hover:text-primary transition-all">
                                    {name}
                                  </p>
                                </a>
                              </Link>
                            ))}
                        </div>
                      </div>
                    </Tab.Panel>
                  ))}
              </Tab.Panels>
            </section>
          </Tab.Group>
        </main>
      </Container>
    </Layout>
  );
};

export default Categories;

// TODO : Add slugs
// TODO : Add responsiveness