# material-table-builder

A simple wizard that allows users to build tables/graphs for use else-where in a material based react project.

## Background

The need for a charting component originated when we were working for the Open Local Governance Digital System here at KLL. Users from different municipalities wanted the functionality to input their own data for the profile section of the website.

To learn more about OLGDS you can visit [this link](http://csmap.klldev.org/test%201/2018/06/01/Open-Local-Government-Digital-System.html).


## Functionalities
The component should allow users to:
1. Plug in data for rendering charts through a wizard.
2. Render charts from data provided
3. Render tables from data provided.

## Components
1. Wizard, that takes in input from the user
2. Chart Component, that renders a chart based on data provided
3. Table Component, that renders a table based on data provided.


## Wizard

### Props to be provided

Configuration object: Tjis object informs the wizard on the struvture of the data that is captured. It comprised of the following three items.

- **initialData**: Array of objects that specifies the structure of the data, and preloads the wizard. Keys will be used as column headers and values will be used as row items.
- **initialTitle**: A dummy title.
- **initialFootNote**: A dummy footnote

All of this can be grouped in a `config` object as follows

```
const config = {
  title: "Dummy Title",
  data: [
    {
      sn: '1',
      name: 'John Doe',
      numberOfSocks: 46
    },
    {
      sn: '2',
      name: 'Jane Doe',
      numberOfSocks: 67
    },
  ]
  footnote: 'Data collected during the annual John & Jane Sock Fair, 2015.'
}
```
