import pandas as pd

def analyze_sales_data(df: pd.DataFrame):
    """
    Analyzes sales data to find trends.
    """
    results = {}
    
    # Ensure Date is datetime
    try:
        if 'Date' in df.columns:
            df['Date'] = pd.to_datetime(df['Date'])
            df = df.sort_values(by='Date')
    except:
        pass # Proceed without time series if date fails

    # Total Revenue
    if 'Sales' in df.columns:
        total_revenue = float(df['Sales'].sum())
        results['total_revenue'] = total_revenue
        
        # Average Order Value
        results['average_order_value'] = float(df['Sales'].mean())
        
        # Trend (Simple linear check or growth from first to last)
        if len(df) > 1:
            first_mo = df['Sales'].iloc[0]
            last_mo = df['Sales'].iloc[-1]
            growth = ((last_mo - first_mo) / first_mo) * 100 if first_mo != 0 else 0
            results['sales_growth_percentage'] = round(growth, 2)
    
    # Top Products
    if 'Product' in df.columns and 'Sales' in df.columns:
        top_products = df.groupby('Product')['Sales'].sum().sort_values(ascending=False).head(3)
        results['top_products'] = top_products.to_dict()
        
    return results

def generate_recommendations(analysis: dict):
    """
    Generates rule-based recommendations based on analysis.
    """
    recommendations = []
    
    growth = analysis.get('sales_growth_percentage', 0)
    total_rev = analysis.get('total_revenue', 0)
    
    # Growth Insights
    if growth < 0:
        recommendations.append({
            "type": "Critical",
            "title": "Sales are declining",
            "action": "Run a promotional campaign or discount for underperforming products to boost cash flow."
        })
    elif growth > 20:
        recommendations.append({
            "type": "Opportunity",
            "title": "Strong Growth Detected",
            "action": "Invest in inventory for top-selling items to prevent stockouts."
        })
    else:
        recommendations.append({
            "type": "Neutral",
            "title": "Stable Growth",
            "action": "Focus on customer retention programs to maintain stability."
        })
        
    # Revenue Insights
    if total_rev > 0 and total_rev < 1000: # Arbitrary small biz logic
         recommendations.append({
            "type": "Tip",
            "title": "Low Revenue Volume",
            "action": "Consider bundling products to increase Average Order Value."
        })

    # Product Specific
    top_prods = analysis.get('top_products', {})
    if top_prods:
        best_seller = list(top_prods.keys())[0]
        recommendations.append({
            "type": "Action",
            "title": f"Star Product: {best_seller}",
            "action": f"Highlight {best_seller} on your homepage and ensure it's always in stock."
        })
        
    return recommendations
