import * as d3 from 'd3';
import { INode } from 'src/domain/model';


const tree = (width, data) => {
    const root = d3.hierarchy(data)
    root.dx = 30;
    root.dy = width / (root.height + 1);
    return d3.tree().nodeSize([root.dx, root.dy])(root);
}


export function graph(width, ref, data) {

    const root = tree(width, data);
    //find the leftmost and rightmost point
    let x0 = Infinity;
    let x1 = -x0;
    root.each(d => {
        if (d.x > x1) { x1 = d.x; }
        if (d.x < x0) { x0 = d.x; }
    });

    const svg = d3.select(ref)
        .style("width", "100%")
        .style("height", "auto");

    const g = svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("transform", `translate(${root.dy / 3},${root.dy - x0})`);

    // create links
    g.append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5)
        .selectAll("path")
        .data(root.links())
        .join("path")
        .attr("d", d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x));

    const node = g.append("g")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .selectAll("g")
        .data(root.descendants().reverse())

        .join("g")
        .attr("transform", d => `translate(${d.y},${d.x})`);

    node.append("circle")
        .attr("fill", d => d.children ? "#555" : "#999")
        .attr("r", 2.5);

    node.append("text")
        .attr("dy", "0.31em")
        .attr("x", (d) => d.children ? -6 : 6)
        .attr("text-anchor", (d) => d.children ? "end" : "start")
        .text((d) => d.data.name)
        .clone(true).lower()
        .attr("stroke", "white");

    return svg.node();
}