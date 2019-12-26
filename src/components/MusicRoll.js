import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import matchSorter from "match-sorter";

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
}
fuzzyTextFilterFn.autoRemove = val => !val;

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data
    },
    useGlobalFilter,
    useSortBy
  );

  return (
    <>
      <div class="field">
        <label class="label" htmlFor="search-input">
          Search
        </label>
        <div class="control">
          <input
            id="search-input"
            class="input"
            type="search"
            placeholder="Search Music..."
            onChange={e => setGlobalFilter(e.target.value)}
            value={state.globalFilter}
          />
        </div>
      </div>
      <table className="table" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? " ↓" : " ↑") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
    </>
  );
}

const MusicRoll = ({
  data: {
    allMarkdownRemark: { edges: posts }
  }
}) => {
  const columns = React.useMemo(
    () => [
      {
        accessor: "title",
        Header: () => "Title",
        Cell: ({
          cell: {
            value,
            row: {
              original: { slug }
            }
          }
        }) => (
          <Link to={slug}>
            <strong>{value}</strong>
          </Link>
        )
      },
      { accessor: "date", Header: "Publication Date" },
      { accessor: "instrumentation", Header: "Instrumentation" }
    ],
    []
  );
  const data = React.useMemo(() => {
    return posts.map(p => ({
      id: p.node.id,
      slug: p.node.fields.slug,
      ...p.node.frontmatter
    }));
  }, [posts]);

  return (
    <div className="column is-10 is-offset-1">
      <Table columns={columns} data={data} />
    </div>
  );
};

MusicRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query MusicRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "music-piece" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                description
                instrumentation
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <MusicRoll data={data} count={count} />}
  />
);
