# StockFlow Frontend - Data Model Documentation

This directory contains UML diagrams and documentation for the data models used in the StockFlow frontend application.

## Data Model UML Diagram

The complete data model is documented in the UML diagram below, which shows all entities, their properties, and relationships.

### View the Diagram

- **PNG Version**: [StockFlow Data Model.png](./StockFlow%20Data%20Model.png)
- **SVG Version**: [StockFlow Data Model.svg](./StockFlow%20Data%20Model.svg)
- **PlantUML Source**: [data-model-uml.puml](./data-model-uml.puml)

### Data Model Overview

The StockFlow frontend data model is organized into the following packages:

#### 1. Authentication Package
Contains all authentication-related data structures:
- **IUser**: Core user entity with username, password, and cash balance
- **IAuthRequest**: Authentication request wrapper containing user and token
- **IAuthContext**: React context interface for managing authentication state
- **LoginRequest/Response**: Login operation data transfer objects
- **RegisterRequest/Response**: Registration operation data transfer objects

#### 2. Stock Management Package
Handles stock-related data:
- **Stock**: Core stock entity with symbol, name, price, and change
- **StockSearchResult**: Search result entity for stock lookups
- **StockContextType**: React context interface for managing stock data

#### 3. Portfolio Management Package
Manages user portfolios and holdings:
- **PortfolioItem**: Individual stock holding with quantity, prices, and performance metrics
- **PortfolioResponse**: Complete portfolio data from the API including cash balance and total value
- **BalanceResponse**: User's cash balance information
- **PortfolioContextType**: React context interface for portfolio operations
- **StockWithQuantity**: Extended stock entity including quantity held

#### 4. Transactions Package
Handles buy/sell operations:
- **OrderType**: Enum defining order types (Market, Limit, Stop)
- **BuyRequest**: Buy order request with stock symbol, quantity, and order details
- **SellRequest**: Sell order request with stock symbol, quantity, and order details
- **Order**: Internal order representation used by the portfolio context

#### 5. API Responses Package
Common API response structures:
- **ErrorResponse**: Standard error response with error message
- **SuccessResponse**: Standard success response with message
- **FXRateResponse**: Foreign exchange rate information with currency pair and changes

### Key Relationships

1. **Authentication Flow**:
   - `IAuthContext` manages `IUser` instances
   - `IAuthRequest` contains both user and token information
   - Login/Register responses create user sessions

2. **Portfolio Management**:
   - `PortfolioResponse` contains multiple `PortfolioItem` instances
   - Each `PortfolioItem` references a `Stock` via symbol
   - `PortfolioContextType` manages the entire portfolio state

3. **Trading Operations**:
   - Both `BuyRequest` and `SellRequest` use the `OrderType` enum
   - `PortfolioContextType` processes orders and creates buy/sell requests
   - All transactions reference stocks by symbol

### Data Flow

```
User Authentication → IAuthContext → IUser
        ↓
Portfolio Access → PortfolioContextType → PortfolioResponse
        ↓
Stock Operations → Buy/Sell Requests → OrderType
        ↓
Portfolio Updates → PortfolioItem[] → StockWithQuantity
```

### Updating the Diagram

If you need to update the UML diagram:

1. Edit the `data-model-uml.puml` file
2. Regenerate the images using PlantUML:
   ```bash
   cd docs
   plantuml -tpng data-model-uml.puml
   plantuml -tsvg data-model-uml.puml
   ```

### PlantUML Syntax

The diagram uses PlantUML syntax with the following conventions:
- `class`: Regular classes and types
- `interface`: TypeScript interfaces
- `enum`: Enumeration types
- `*--`: Composition (contains)
- `..>`: Dependency (uses)
- `--|>`: Inheritance (extends)

### Notes

- Optional properties are denoted with `?` suffix
- Function signatures show parameters and return types
- React-specific types (like `React.Dispatch`) are included where relevant
- All data models are based on the TypeScript types in `/src/types` and `/src/generated/api/requests`

## Additional Resources

- [TypeScript Types Directory](../src/types/)
- [Generated API Types](../src/generated/api/requests/types.gen.ts)
- [Project Documentation](../PROJECT_PRESENTATION.md)
- [README](../README.md)
