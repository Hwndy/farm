import { Package, DollarSign, Users, TrendingUp } from "lucide-react";
import styled from "styled-components";
import { useState, useEffect } from "react";

// Styled Components
const StatsGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 481px) and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatCard = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  .icon-container {
    padding: 0.5rem;
    background-color: #d1fae5;
    border-radius: 0.5rem;

    @media (max-width: 768px) {
      padding: 0.35rem;
    }
  }

  .change {
    font-size: 0.875rem;
    font-weight: 500;
    color: ${(props) => (props.changeType === "increase" ? "#16a34a" : "#dc2626")};

    @media (max-width: 768px) {
      font-size: 0.75rem;
    }
  }
`;

const StatValue = styled.h3`
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 0.25rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const StatTitle = styled.p`
  font-size: 0.875rem;
  color: #4b5563;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

export default function AdminStats({ productNo }) {
  const [stats, setStats] = useState({
    products: { current: 0, previous: 0 },
    sales: { current: 0, previous: 0 },
    customers: { current: 0, previous: 0 },
    growth: { current: 0, previous: 0 }
  });

  useEffect(() => {
    // Load previous stats from localStorage
    const loadPreviousStats = () => {
      const savedStats = localStorage.getItem('adminStats');
      if (savedStats) {
        return JSON.parse(savedStats);
      }
      return stats;
    };

    // Update stats with new values
    const updateStats = () => {
      const previousStats = loadPreviousStats();
      
      const newStats = {
        products: {
          current: productNo,
          previous: previousStats.products.current
        },
        sales: {
          current: calculateSales(), // Implement your sales calculation
          previous: previousStats.sales.current
        },
        customers: {
          current: calculateCustomers(), // Implement your customers calculation
          previous: previousStats.customers.current
        },
        growth: {
          current: calculateGrowth(), // Implement your growth calculation
          previous: previousStats.growth.current
        }
      };

      setStats(newStats);
      localStorage.setItem('adminStats', JSON.stringify(newStats));
    };

    updateStats();
  }, [productNo]);

  // Helper functions for calculations
  const calculateSales = () => {
    // Implement your sales calculation logic
    return 4290; // Placeholder value
  };

  const calculateCustomers = () => {
    // Implement your customers calculation logic
    return 156; // Placeholder value
  };

  const calculateGrowth = () => {
    // Implement your growth calculation logic
    return 32; // Placeholder value
  };

  const calculateChange = (current, previous) => {
    if (previous === 0 && current === 0) return "0%";
    if (previous === 0) return "+100%";
    const change = ((current - previous) / previous) * 100;
    return `${change > 0 ? "+" : ""}${change.toFixed(1)}%`;
  };

  const statsConfig = [
    {
      title: "Total Products",
      value: stats.products.current,
      icon: Package,
      change: calculateChange(stats.products.current, stats.products.previous),
      changeType: stats.products.current >= stats.products.previous ? "increase" : "decrease",
    },
    {
      title: "Total Sales",
      value: `₦${stats.sales.current}`,
      icon: DollarSign,
      change: calculateChange(stats.sales.current, stats.sales.previous),
      changeType: stats.sales.current >= stats.sales.previous ? "increase" : "decrease",
    },
    {
      title: "Total Customers",
      value: stats.customers.current,
      icon: Users,
      change: calculateChange(stats.customers.current, stats.customers.previous),
      changeType: stats.customers.current >= stats.customers.previous ? "increase" : "decrease",
    },
    {
      title: "Growth Rate",
      value: `${stats.growth.current}%`,
      icon: TrendingUp,
      change: calculateChange(stats.growth.current, stats.growth.previous),
      changeType: stats.growth.current >= stats.growth.previous ? "increase" : "decrease",
    },
  ];

  return (
    <StatsGrid>
      {statsConfig.map((stat, index) => (
        <StatCard key={index}>
          <StatHeader changeType={stat.changeType}>
            <div className="icon-container">
              <stat.icon size={24} color="#16a34a" />
            </div>
            <span className="change">{stat.change}</span>
          </StatHeader>
          <StatValue>{stat.value}</StatValue>
          <StatTitle>{stat.title}</StatTitle>
        </StatCard>
      ))}
    </StatsGrid>
  );
}
