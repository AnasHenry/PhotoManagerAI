import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  CalendarDays,
  ChartPie,
  ArrowRight,
  NotebookText,
} from "lucide-react";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import bgimg from "../../assets/land1.jpg";
import backimage from "../../assets/port1.jpg";

function NavigationCard({
  href,
  icon: Icon,
  title,
  description,
  actionText,
  iconBgColor,
  iconColor,
  hoverColor,
  gradientFrom,
  gradientTo,
  delay,
}) {
  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <motion.div
      onClick={() => navigate(href)}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.2,
        delay: delay,
        ease: "easeIn",
      }}
      whileHover={{
        y: -4,
        scale: 1.02,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      whileTap={{ scale: 0.98 }}
      style={{
        background: colors.primary[400],
        borderRadius: "12px",
        padding: "20px",
        border: "1px solid #e2e8f0",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
      }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          backgroundColor: colors.redAccent[500],
          opacity: 0.5,
          transform: "translate(40%, -40%)",
        }}></div>

      <div style={{ position: "relative", zIndex: 10 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}>
          <motion.div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "8px",
              backgroundColor: iconBgColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}>
            <Icon style={{ width: "24px", height: "24px", color: iconColor }} />
          </motion.div>
          <ArrowRight
            style={{
              width: "16px",
              height: "16px",
              color: "#94a3b8",
              transition: "color 0.2s",
            }}
          />
        </div>

        <h3
          style={{
            fontSize: "1.125rem",
            fontWeight: "600",
            color: colors.redAccent[100],
            marginBottom: "0.5rem",
          }}>
          {title}
        </h3>
        <p
          style={{
            color: colors.whiteAccent[300],
            fontSize: "0.9rem",
            lineHeight: "1.5",
          }}>
          {description}
        </p>

        <div
          style={{
            marginTop: "1rem",
            paddingTop: "0.75rem",
            borderTop: "1px solid #f1f5f9",
            fontSize: "0.85rem",
            fontWeight: "500",
            color: colors.whiteAccent[300],
          }}>
          {actionText} →
        </div>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const navigationCards = [
    {
      href: "./stats",
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "View my stats",
      actionText: "View Analytics",
      iconBgColor: "#dbeafe",
      iconColor: "#2563eb",
      hoverColor: "#2563eb",
      gradientFrom: "rgba(96, 165, 250, 0.1)",
      gradientTo: "rgba(37, 99, 235, 0.1)",
      delay: 0.3,
    },
    {
      href: "./contracts",
      icon: NotebookText,
      title: "Contracts Management",
      description: "View my contracts",
      actionText: "Manage contracts",
      iconBgColor: "#e0e7ff",
      iconColor: "#4f46e5",
      hoverColor: "#4f46e5",
      gradientFrom: "rgba(129, 140, 248, 0.1)",
      gradientTo: "rgba(99, 102, 241, 0.1)",
      delay: 0.4,
    },
    {
      href: "./calendar",
      icon: CalendarDays,
      title: "Calendar",
      description: "View my Calendar",
      actionText: "Open calendar",
      iconBgColor: "#d1fae5",
      iconColor: "#059669",
      hoverColor: "#059669",
      gradientFrom: "rgba(52, 211, 153, 0.1)",
      gradientTo: "rgba(16, 185, 129, 0.1)",
      delay: 0.5,
    },
    {
      href: "./area",
      icon: ChartPie,
      title: "Chart Analysis",
      description: "Analyse my progress",
      actionText: "View Reports",
      iconBgColor: "#fef3c7",
      iconColor: "#f59e0b",
      hoverColor: "#f59e0b",
      gradientFrom: "rgba(253, 224, 71, 0.1)",
      gradientTo: "rgba(245, 158, 11, 0.1)",
      delay: 0.6,
    },
  ];

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div>
      {/* Import font only within this component */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap');`}
      </style>

      {/* Apply font only inside this component */}
      <div
        style={{
          fontFamily: "'Source Sans Pro', sans-serif",
          minHeight: "100vh",
          padding: "2rem 1rem",
        }}>
        <div
          style={{ maxWidth: "960px", margin: "0 auto", marginBottom: "3rem" }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}>
            <div
              style={{
                fontSize: "4rem",
                fontWeight: "bold",
                marginBottom: "1rem",
                backgroundImage: `url(${bgimg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}>
              PHOTO MANA
            </div>
            <p
              style={{
                fontSize: "1rem",
                color: colors.whiteAccent[100],
                maxWidth: "640px",
              }}>
              Your all in one services to manage your Photography Career
            </p>
          </motion.div>
        </div>

        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.25rem",
          }}>
          {navigationCards.map((card) => (
            <NavigationCard key={card.href} {...card} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            maxWidth: "960px",
            margin: "3rem auto 0",
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "0.875rem",
          }}>
          Dashboard • Photo MANA
        </motion.div>
      </div>
    </div>
  );
}
