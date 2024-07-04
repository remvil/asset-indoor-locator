
# Asset Indoor Locator

A ionic Vue and express node asset location management

Asset Indoor Locator is an application designed to monitor and track devices within indoor facilities and companies. It can integrate with APIs from any BLE detection system or similar technology. The application allows for managing floor plans and route maps to locate one or more assets and provides real-time device monitoring.


## Authors

- [remvil](https://www.github.com/remvil)


## Features

- Search assets on map
- View assets list
- View assets detail


## API Reference

#### Get map planimetry

```http
  GET /api/map/planimetry
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `location` | `string` | **Required**. |
| `floor` | `number` | optional |


#### Get map assets

```http
  GET /api/map/assets
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `location` | `string` | **Required**. |
| `floor` | `number` | optional |




#### Get all assets

```http
  GET /api/assets/list
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `location` | `string` | **Required**. |

