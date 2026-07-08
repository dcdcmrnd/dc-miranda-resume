/* @ds-bundle: {"format":4,"namespace":"AequoraDigitalDesignSystem_9c2f1b","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"PricingCard","sourcePath":"components/pricing/PricingCard.jsx"},{"name":"FaqSection","sourcePath":"ui_kits/aequora-digital-site/FaqSection.jsx"},{"name":"Footer","sourcePath":"ui_kits/aequora-digital-site/Footer.jsx"},{"name":"Header","sourcePath":"ui_kits/aequora-digital-site/Header.jsx"},{"name":"Hero","sourcePath":"ui_kits/aequora-digital-site/Hero.jsx"},{"name":"PricingSection","sourcePath":"ui_kits/aequora-digital-site/PricingSection.jsx"},{"name":"Reveal","sourcePath":"ui_kits/aequora-digital-site/ScrollFx.jsx"},{"name":"ServicesSection","sourcePath":"ui_kits/aequora-digital-site/ServicesSection.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"55ad0035a304","components/core/Button.jsx":"3d5664dbfcb8","components/core/Card.jsx":"441e87137498","components/core/IconButton.jsx":"a3741a35c71b","components/core/Tag.jsx":"5cdd5353912f","components/feedback/Dialog.jsx":"efce14a89d22","components/feedback/Toast.jsx":"27b8f0145957","components/feedback/Tooltip.jsx":"35ab7fcc50e1","components/forms/Checkbox.jsx":"002de42a7fab","components/forms/Input.jsx":"ddfb4838cce2","components/forms/Select.jsx":"de5189ea3cbf","components/forms/Switch.jsx":"a8d5fbfa3505","components/navigation/Tabs.jsx":"3153883f63dc","components/pricing/PricingCard.jsx":"e6bac9172f1f","ui_kits/aequora-digital-site/FaqSection.jsx":"cb2bd6454aca","ui_kits/aequora-digital-site/Footer.jsx":"69b8bc6de77e","ui_kits/aequora-digital-site/Header.jsx":"e3ea90fe644d","ui_kits/aequora-digital-site/Hero.jsx":"b918ed93b45d","ui_kits/aequora-digital-site/PricingSection.jsx":"581d73250463","ui_kits/aequora-digital-site/ScrollFx.jsx":"907644577990","ui_kits/aequora-digital-site/ServicesSection.jsx":"c84ab19ea089"},"inlinedExternals":[],"unexposedExports":[{"name":"useParallax","sourcePath":"ui_kits/aequora-digital-site/ScrollFx.jsx"}]} */

(() => {

const __ds_ns = (window.AequoraDigitalDesignSystem_9c2f1b = window.AequoraDigitalDesignSystem_9c2f1b || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
const TONES = {
  navy: {
    background: "var(--navy)",
    color: "var(--text-inverse)"
  },
  terra: {
    background: "var(--terra)",
    color: "var(--navy-dk)"
  },
  success: {
    background: "var(--feedback-success)",
    color: "var(--text-inverse)"
  },
  dark: {
    background: "var(--navy-dk)",
    color: "var(--text-inverse)"
  },
  light: {
    background: "var(--surface-sunken)",
    color: "var(--text-primary)"
  }
};
function Badge({
  children,
  tone = "navy"
}) {
  const toneStyle = TONES[tone] || TONES.rust;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      height: 24,
      padding: "0 10px",
      borderRadius: "var(--radius-pill)",
      font: "700 11px/1 var(--font-body)",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      ...toneStyle
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const SIZE_STYLES = {
  sm: {
    height: 36,
    padding: "0 16px",
    font: "700 13px/1 var(--font-body)"
  },
  md: {
    height: 46,
    padding: "0 22px",
    font: "700 14px/1 var(--font-body)"
  },
  lg: {
    height: 56,
    padding: "0 30px",
    font: "700 15px/1 var(--font-body)"
  }
};
const VARIANT_STYLES = {
  primary: {
    background: "var(--action-primary)",
    color: "var(--text-inverse)",
    border: "2px solid var(--action-primary)"
  },
  secondary: {
    background: "var(--action-secondary)",
    color: "var(--text-h)",
    border: "2px solid var(--action-secondary)"
  },
  outline: {
    background: "transparent",
    color: "var(--text-secondary)",
    border: "1.5px solid var(--border-default)"
  },
  inverse: {
    background: "var(--surface-page)",
    color: "var(--text-h)",
    border: "2px solid var(--surface-page)"
  },
  ghost: {
    background: "transparent",
    color: "var(--text-primary)",
    border: "2px solid transparent"
  }
};
const VARIANT_HOVER = {
  primary: {
    background: "var(--action-primary-hover)",
    borderColor: "var(--action-primary-hover)"
  },
  secondary: {
    background: "var(--action-secondary-hover)",
    borderColor: "var(--action-secondary-hover)"
  },
  outline: {
    borderColor: "var(--action-primary)",
    color: "var(--action-primary)"
  },
  inverse: {
    background: "var(--surface-sunken)"
  },
  ghost: {
    background: "var(--surface-sunken)"
  }
};
function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  icon = null,
  iconPosition = "right",
  pill = true,
  onClick,
  type = "button"
}) {
  const [hover, setHover] = React.useState(false);
  const sizeStyle = SIZE_STYLES[size] || SIZE_STYLES.md;
  const variantStyle = VARIANT_STYLES[variant] || VARIANT_STYLES.primary;
  const hoverStyle = !disabled && hover ? VARIANT_HOVER[variant] : {};
  const style = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: sizeStyle.height,
    padding: sizeStyle.padding,
    font: sizeStyle.font,
    borderRadius: pill ? "var(--radius-pill)" : "var(--radius-md)",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard)",
    opacity: disabled ? 0.45 : 1,
    transform: !disabled && hover ? "translateY(-1px)" : "none",
    ...variantStyle,
    ...hoverStyle
  };
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: style
  }, icon && iconPosition === "left" ? icon : null, children, icon && iconPosition === "right" ? icon : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function Card({
  children,
  padded = true,
  elevated = true
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      borderRadius: "var(--radius-lg)",
      border: "1px solid var(--border-subtle)",
      boxShadow: elevated ? "var(--shadow-md)" : "none",
      padding: padded ? "var(--space-5)" : 0
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
const SIZES = {
  sm: 32,
  md: 40,
  lg: 48
};
function IconButton({
  icon,
  label,
  variant = "ghost",
  size = "md",
  onClick,
  badge
}) {
  const [hover, setHover] = React.useState(false);
  const dim = SIZES[size] || SIZES.md;
  const base = variant === "solid" ? {
    background: "var(--action-primary)",
    color: "var(--text-inverse)"
  } : {
    background: hover ? "var(--surface-sunken)" : "transparent",
    color: "var(--text-primary)"
  };
  return /*#__PURE__*/React.createElement("button", {
    "aria-label": label,
    title: label,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: "relative",
      width: dim,
      height: dim,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-pill)",
      border: "none",
      cursor: "pointer",
      transition: "background var(--duration-fast) var(--ease-standard)",
      ...base
    }
  }, icon, badge ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: -2,
      right: -2,
      minWidth: 16,
      height: 16,
      padding: "0 4px",
      borderRadius: "var(--radius-pill)",
      background: "var(--action-primary)",
      color: "var(--text-inverse)",
      font: "700 10px/16px var(--font-body)",
      textAlign: "center"
    }
  }, badge) : null);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  children,
  selected = false,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      height: 34,
      padding: "0 16px",
      borderRadius: "var(--radius-pill)",
      border: selected ? "2px solid var(--action-primary)" : "2px solid var(--border-default)",
      background: selected ? "var(--action-primary)" : hover ? "var(--surface-sunken)" : "transparent",
      color: selected ? "var(--text-inverse)" : "var(--text-primary)",
      font: "600 13px/1 var(--font-body)",
      cursor: "pointer",
      transition: "all var(--duration-fast) var(--ease-standard)"
    }
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open,
  onClose,
  title,
  children
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(23, 19, 15, 0.55)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: "var(--surface-card)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-lg)",
      padding: "var(--space-6)",
      maxWidth: 440,
      width: "90%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: "var(--text-display-sm)",
      color: "var(--text-primary)",
      textTransform: "uppercase"
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: "none",
      border: "none",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/x.svg",
    style: {
      width: 18,
      height: 18
    }
  }))), children));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const TONES = {
  default: {
    background: "var(--navy-dk)",
    color: "var(--text-inverse)"
  },
  success: {
    background: "var(--feedback-success)",
    color: "var(--text-inverse)"
  },
  danger: {
    background: "var(--feedback-danger)",
    color: "var(--text-inverse)"
  }
};
function Toast({
  children,
  tone = "default",
  onDismiss
}) {
  const toneStyle = TONES[tone] || TONES.default;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "14px 18px",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-lg)",
      font: "var(--text-body-sm)",
      maxWidth: 360,
      ...toneStyle
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, children), onDismiss ? /*#__PURE__*/React.createElement("button", {
    onClick: onDismiss,
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      opacity: 0.7
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/x.svg",
    style: {
      width: 14,
      height: 14,
      filter: "invert(1)"
    }
  })) : null);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function Tooltip({
  children,
  label,
  position = "top"
}) {
  const [show, setShow] = React.useState(false);
  const posStyle = position === "top" ? {
    bottom: "calc(100% + 8px)",
    left: "50%",
    transform: "translateX(-50%)"
  } : {
    top: "calc(100% + 8px)",
    left: "50%",
    transform: "translateX(-50%)"
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex"
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false)
  }, children, show ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      ...posStyle,
      background: "var(--n-950)",
      color: "var(--text-inverse)",
      font: "600 12px/1.3 var(--font-body)",
      padding: "6px 10px",
      borderRadius: "var(--radius-sm)",
      whiteSpace: "nowrap",
      boxShadow: "var(--shadow-md)",
      zIndex: 10
    }
  }, label) : null);
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  checked = false,
  onChange
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => onChange && onChange(!checked),
    style: {
      width: 22,
      height: 22,
      borderRadius: "var(--radius-sm)",
      border: `2px solid ${checked ? "var(--action-primary)" : "var(--border-default)"}`,
      background: checked ? "var(--action-primary)" : "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all var(--duration-fast) var(--ease-standard)",
      flexShrink: 0
    }
  }, checked ? /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/check.svg",
    style: {
      width: 14,
      height: 14,
      filter: "invert(1)"
    }
  }) : null), label ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-body-md)",
      color: "var(--text-primary)"
    }
  }, label) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
  icon
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      width: "100%"
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-label)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-secondary)"
    }
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      height: 48,
      padding: "0 16px",
      borderRadius: "var(--radius-md)",
      background: "var(--surface-card)",
      border: `2px solid ${error ? "var(--feedback-danger)" : focus ? "var(--action-primary)" : "var(--border-default)"}`,
      transition: "border-color var(--duration-fast) var(--ease-standard)"
    }
  }, icon, /*#__PURE__*/React.createElement("input", {
    type: type,
    value: value,
    placeholder: placeholder,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      border: "none",
      outline: "none",
      flex: 1,
      font: "var(--text-body-md)",
      color: "var(--text-primary)",
      background: "transparent"
    }
  })), error ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "600 12px/1.4 var(--font-body)",
      color: "var(--feedback-danger)"
    }
  }, error) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function Select({
  label,
  value,
  onChange,
  options = []
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      width: "100%"
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-label)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-secondary)"
    }
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: value,
    onChange: onChange,
    style: {
      width: "100%",
      height: 48,
      padding: "0 40px 0 16px",
      borderRadius: "var(--radius-md)",
      border: "2px solid var(--border-default)",
      background: "var(--surface-card)",
      font: "var(--text-body-md)",
      color: "var(--text-primary)",
      appearance: "none",
      cursor: "pointer"
    }
  }, options.map(opt => /*#__PURE__*/React.createElement("option", {
    key: opt.value,
    value: opt.value
  }, opt.label))), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/chevron-down.svg",
    style: {
      width: 16,
      height: 16,
      position: "absolute",
      right: 14,
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none"
    }
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  label,
  checked = false,
  onChange
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => onChange && onChange(!checked),
    style: {
      width: 44,
      height: 26,
      borderRadius: "var(--radius-pill)",
      background: checked ? "var(--action-primary)" : "var(--border-default)",
      position: "relative",
      transition: "background var(--duration-fast) var(--ease-standard)",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 3,
      left: checked ? 21 : 3,
      width: 20,
      height: 20,
      borderRadius: "50%",
      background: "#fff",
      boxShadow: "var(--shadow-sm)",
      transition: "left var(--duration-fast) var(--ease-standard)"
    }
  })), label ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-body-md)",
      color: "var(--text-primary)"
    }
  }, label) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  tabs,
  active,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-6)",
      borderBottom: "2px solid var(--border-subtle)"
    }
  }, tabs.map(tab => {
    const isActive = tab.value === active;
    return /*#__PURE__*/React.createElement("button", {
      key: tab.value,
      onClick: () => onChange(tab.value),
      style: {
        background: "none",
        border: "none",
        padding: "12px 0",
        marginBottom: -2,
        borderBottom: `3px solid ${isActive ? "var(--action-primary)" : "transparent"}`,
        font: "700 14px/1 var(--font-body)",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        color: isActive ? "var(--text-primary)" : "var(--text-muted)",
        cursor: "pointer",
        transition: "color var(--duration-fast) var(--ease-standard)"
      }
    }, tab.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/pricing/PricingCard.jsx
try { (() => {
function PricingCard({
  tier,
  price,
  note,
  features = [],
  ctaLabel = "Get Started",
  featured = false,
  onSelect
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      flexDirection: "column",
      border: featured ? "1px solid var(--navy)" : "1px solid var(--border-default)",
      borderRadius: "var(--radius-md)",
      background: featured ? "var(--navy)" : "var(--surface-card)",
      padding: "36px 28px 30px",
      boxShadow: featured ? "var(--shadow-lg)" : hover ? "var(--shadow-md)" : "none",
      transform: !featured && hover ? "translateY(-4px)" : "none",
      transition: "transform var(--duration-slow) var(--ease-standard), box-shadow var(--duration-slow) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-label)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: featured ? "rgba(255,255,255,0.45)" : "var(--text-muted)",
      marginBottom: 12
    }
  }, tier), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 2,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "1.4rem",
      fontWeight: 300,
      marginTop: 10,
      color: featured ? "rgba(255,255,255,0.95)" : "var(--text-primary)",
      fontFamily: "var(--font-body)"
    }
  }, "$"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "4rem",
      fontWeight: 800,
      lineHeight: 1,
      letterSpacing: "-0.04em",
      color: featured ? "rgba(255,255,255,0.95)" : "var(--text-primary)",
      fontFamily: "var(--font-body)"
    }
  }, price)), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "600 12px/1.4 var(--font-body)",
      color: featured ? "rgba(255,255,255,0.45)" : "var(--navy)",
      marginBottom: 24
    }
  }, note), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      marginBottom: 24
    }
  }, features.map(f => /*#__PURE__*/React.createElement("div", {
    key: f,
    style: {
      display: "flex",
      gap: 10,
      padding: "10px 0",
      borderBottom: `1px solid ${featured ? "rgba(255,255,255,0.1)" : "var(--border-subtle)"}`,
      font: "var(--text-body-sm)",
      color: featured ? "rgba(255,255,255,0.72)" : "var(--text-secondary)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: featured ? "var(--sand)" : "var(--navy)",
      fontWeight: 700,
      fontSize: "0.7rem",
      marginTop: 2
    }
  }, "\u2713"), f))), /*#__PURE__*/React.createElement("button", {
    onClick: onSelect,
    style: {
      marginTop: "auto",
      height: 48,
      borderRadius: "var(--radius-pill)",
      border: featured ? "none" : "1.5px solid var(--border-default)",
      background: featured ? "rgba(255,255,255,0.95)" : "transparent",
      color: featured ? "var(--navy)" : "var(--text-secondary)",
      font: "700 14px/1 var(--font-body)",
      cursor: "pointer",
      transition: "background var(--duration-fast) var(--ease-standard)"
    }
  }, ctaLabel));
}
Object.assign(__ds_scope, { PricingCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/pricing/PricingCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/aequora-digital-site/Footer.jsx
try { (() => {
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--navy-dk)",
      color: "var(--white)",
      padding: "64px 44px 28px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.4fr 1fr 1fr",
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/aequora-digital-logo.png",
    style: {
      width: 26,
      height: 26,
      filter: "brightness(0) invert(1)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "700 15px/1 var(--font-body)"
    }
  }, "Aequora Digital")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--text-body-sm)",
      color: "rgba(242,250,254,0.55)",
      maxWidth: 280
    }
  }, "One team. Your website. Handled.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      font: "600 13px/1 var(--font-body)"
    }
  }, ["Services", "Our Work", "Pricing", "FAQ", "Contact"].map(item => /*#__PURE__*/React.createElement("a", {
    key: item,
    href: "#",
    style: {
      color: "rgba(242,250,254,0.6)"
    }
  }, item))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: "0 0 10px 0",
      font: "700 15px/1.3 var(--font-body)"
    }
  }, "Let's Work Together"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 14px 0",
      font: "var(--text-body-sm)",
      color: "rgba(242,250,254,0.55)"
    }
  }, "info@aequoradigital.com"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      height: 44,
      padding: "0 20px",
      borderRadius: "var(--radius-pill)",
      background: "var(--terra)",
      color: "var(--navy-dk)",
      font: "700 13px/1 var(--font-body)"
    }
  }, "Send My Inquiry \u2192"))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-inverse)",
      paddingTop: 20,
      font: "var(--text-body-xs)",
      color: "rgba(242,250,254,0.4)"
    }
  }, "\xA9 2026 Aequora Digital \u2014 One team. Your website. Handled.")));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/aequora-digital-site/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/aequora-digital-site/Header.jsx
try { (() => {
function Header({
  onMenuClick
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 68,
      padding: "0 44px",
      background: "rgba(242,250,254,0.94)",
      borderBottom: "1px solid var(--border-subtle)",
      backdropFilter: "blur(14px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/aequora-digital-logo.png",
    style: {
      width: 30,
      height: 30,
      objectFit: "contain"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "500 16px/1 var(--font-body)",
      color: "var(--navy)",
      letterSpacing: "-0.01em"
    }
  }, "Aequora", /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 800,
      color: "var(--text-h)"
    }
  }, "Digital"))), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: 36
    },
    className: "desktop-nav"
  }, ["Services", "Our Work", "Pricing", "FAQ"].map(item => /*#__PURE__*/React.createElement("a", {
    key: item,
    href: "#",
    style: {
      font: "500 13px/1 var(--font-body)",
      color: "var(--text-m)"
    }
  }, item))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "desktop-nav",
    style: {
      display: "inline-flex",
      alignItems: "center",
      padding: "9px 22px",
      borderRadius: "var(--radius-pill)",
      background: "var(--navy)",
      color: "var(--white)",
      font: "700 13px/1 var(--font-body)"
    }
  }, "Start a Project"), /*#__PURE__*/React.createElement("button", {
    onClick: onMenuClick,
    "aria-label": "Menu",
    className: "mobile-menu-btn",
    style: {
      width: 40,
      height: 40,
      border: "none",
      background: "transparent",
      cursor: "pointer",
      display: "none",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/menu.svg",
    style: {
      width: 20,
      height: 20
    }
  }))));
}
Object.assign(__ds_scope, { Header });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/aequora-digital-site/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/aequora-digital-site/ScrollFx.jsx
try { (() => {
/* Scroll-driven motion helpers.
   Technique reference: buckssauce.com/about uses layered parallax imagery and a
   scroll-scrubbed sequence to tell a story as you scroll. This file reproduces
   the *technique* (IntersectionObserver reveals + rAF-throttled parallax) with
   Aequora's own content/assets — no code or imagery was copied from that site. */

const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;

/** Fades + slides a section up as it enters the viewport. */
function Reveal({
  children,
  delay = 0,
  y = 24,
  style = {}
}) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(prefersReducedMotion);
  React.useEffect(() => {
    if (prefersReducedMotion || !ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: "0px 0px -8% 0px"
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity var(--duration-slow) var(--ease-out) ${delay}ms, transform var(--duration-slow) var(--ease-out) ${delay}ms`,
      ...style
    }
  }, children);
}

/** Returns a ref + inline style that translates an element at `speed`x scroll rate. */
function useParallax(speed = 0.3) {
  const ref = React.useRef(null);
  const [offset, setOffset] = React.useState(0);
  React.useEffect(() => {
    if (prefersReducedMotion || !ref.current) return;
    let raf = null;
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const rect = ref.current.getBoundingClientRect();
        const vh = window.innerHeight || 800;
        const progress = (vh - rect.top) / (vh + rect.height); // -ish 0..1 through viewport
        setOffset((progress - 0.5) * speed * 200);
        raf = null;
      });
    }
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);
  return {
    ref,
    style: {
      transform: `translateY(${offset}px)`
    }
  };
}
Object.assign(__ds_scope, { Reveal, useParallax });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/aequora-digital-site/ScrollFx.jsx", error: String((e && e.message) || e) }); }

// ui_kits/aequora-digital-site/FaqSection.jsx
try { (() => {
const FAQS = [{
  q: "Why should I trust a team I haven't heard of?",
  a: "We came from the AI industry, building tools and managing VA operations for tech companies before launching Aequora Digital. We're focused on doing great work for a small number of U.S. businesses and letting the results speak."
}, {
  q: "What do you mean by \"full stack\"?",
  a: "Every project includes the front end your customers see, the backend and database that power it, and your domain connected and live — one team handles all of it."
}, {
  q: "Do I own the website after it's built?",
  a: "Yes, 100%. Once the project is delivered and paid for, you own the site, the code, the database, and all the content."
}, {
  q: "How quickly can you start?",
  a: "We can typically kick off within 48 hours of signing. First draft delivered within 2 days of receiving your assets and brief. Your site goes live within 14 days."
}];
function FaqSection() {
  const [open, setOpen] = React.useState(0);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "80px 44px",
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 44
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      font: "700 11px/1 var(--font-body)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--navy)",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 2,
      background: "var(--terra)",
      borderRadius: 2
    }
  }), "Common Questions"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "var(--text-display-md)",
      color: "var(--text-h)"
    }
  }, "Everything you need to know.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, FAQS.map((item, i) => {
    const isOpen = open === i;
    return /*#__PURE__*/React.createElement(__ds_scope.Reveal, {
      key: item.q,
      delay: i * 60,
      y: 16
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-md)",
        background: "var(--surface-card)",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(isOpen ? -1 : i),
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 22px",
        background: "none",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        font: "700 15px/1.3 var(--font-body)",
        color: "var(--text-h)"
      }
    }, item.q, /*#__PURE__*/React.createElement("span", {
      style: {
        transform: isOpen ? "rotate(180deg)" : "none",
        transition: "transform var(--duration-base) var(--ease-standard)",
        flexShrink: 0,
        marginLeft: 12
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/icons/chevron-down.svg",
      style: {
        width: 16,
        height: 16
      }
    }))), isOpen ? /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 22px 20px",
        font: "var(--text-body-sm)",
        color: "var(--text-m)",
        lineHeight: 1.65
      }
    }, item.a) : null));
  }))));
}
Object.assign(__ds_scope, { FaqSection });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/aequora-digital-site/FaqSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/aequora-digital-site/Hero.jsx
try { (() => {
const STATS = [{
  value: "48h",
  label: "avg. first draft"
}, {
  value: "100%",
  label: "U.S. focused"
}, {
  value: "Free",
  label: "site review"
}, {
  value: "6",
  label: "services, one team"
}];
function Hero() {
  const bgParallax = __ds_scope.useParallax(0.4);
  const photoParallax = __ds_scope.useParallax(0.2);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--white)",
      padding: "60px 44px 0",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: bgParallax.ref,
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: "-10% -5%",
      backgroundImage: "radial-gradient(circle, rgba(13,92,122,0.14) 1.5px, transparent 1.5px)",
      backgroundSize: "28px 28px",
      maskImage: "radial-gradient(ellipse 60% 50% at 50% 30%, black, transparent)",
      WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 30%, black, transparent)",
      pointerEvents: "none",
      zIndex: 0,
      ...bgParallax.style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1fr 1.05fr",
      gap: 72,
      alignItems: "center",
      paddingBottom: 48,
      position: "relative",
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(__ds_scope.Reveal, {
    y: 16
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 14px",
      borderRadius: "var(--radius-pill)",
      background: "rgba(13,92,122,0.07)",
      border: "1px solid rgba(13,92,122,0.13)",
      font: "600 11px/1 var(--font-body)",
      color: "var(--navy)",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--terra)"
    }
  }), "Web Design & Enhancement \xB7 U.S. Small Business")), /*#__PURE__*/React.createElement(__ds_scope.Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--text-display-xl)",
      letterSpacing: "var(--tracking-display)",
      color: "var(--text-h)",
      margin: "0 0 24px 0"
    }
  }, "Your website is losing you customers.", " ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: "italic",
      fontWeight: 300,
      backgroundImage: "linear-gradient(120deg, var(--navy) 0%, var(--navy-lt) 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text"
    }
  }, "Let's fix that."))), /*#__PURE__*/React.createElement(__ds_scope.Reveal, {
    delay: 160
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--text-body-lg)",
      color: "var(--text-m)",
      maxWidth: 440,
      margin: "0 0 36px 0"
    }
  }, "We build, manage, and grow websites for U.S. small businesses. You get more customers from Google, we handle everything else. No freelancer headaches. No DIY guesswork. Just results.")), /*#__PURE__*/React.createElement(__ds_scope.Reveal, {
    delay: 240
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      display: "inline-flex",
      alignItems: "center",
      padding: "13px 28px",
      borderRadius: "var(--radius-pill)",
      background: "var(--navy)",
      color: "var(--white)",
      font: "700 14px/1 var(--font-body)",
      boxShadow: "0 4px 20px rgba(13,92,122,0.25)"
    }
  }, "Get a Free Site Review \u2192"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      display: "inline-flex",
      alignItems: "center",
      padding: "13px 24px",
      borderRadius: "var(--radius-pill)",
      border: "1.5px solid var(--border-default)",
      color: "var(--text-b)",
      font: "600 14px/1 var(--font-body)"
    }
  }, "See Our Work"))), /*#__PURE__*/React.createElement(__ds_scope.Reveal, {
    delay: 320
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex"
    }
  }, STATS.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.label,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 3,
      padding: i === 0 ? "0 28px 0 0" : "0 28px",
      borderLeft: i > 0 ? "1px solid var(--border-default)" : "none"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      font: "800 24px/1 var(--font-body)",
      color: "var(--navy)",
      letterSpacing: "-0.03em"
    }
  }, s.value), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "500 11px/1.3 var(--font-body)",
      color: "var(--text-m)"
    }
  }, s.label)))))), /*#__PURE__*/React.createElement("div", {
    ref: photoParallax.ref,
    style: {
      aspectRatio: "4/3",
      borderRadius: "var(--radius-lg)",
      background: "var(--bg-lt)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--text-m)",
      font: "var(--text-body-sm)",
      border: "1px dashed var(--border-default)",
      ...photoParallax.style
    }
  }, "hero photo placeholder")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      justifyContent: "center",
      padding: "14px 44px 18px",
      borderTop: "1px solid rgba(13,92,122,0.08)",
      maxWidth: 1200,
      margin: "0 auto",
      position: "relative",
      zIndex: 1
    }
  }, ["Website Management", "SEO Services", "Google Ads", "Website Builds", "Managed VA Services", "Membership Portals", "E-Commerce Sites"].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "9px 14px",
      borderRadius: "var(--radius-md)",
      background: "rgba(13,92,122,0.05)",
      border: "1px solid rgba(13,92,122,0.1)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "700 9px/1 var(--font-body)",
      color: "var(--terra)",
      letterSpacing: "0.08em"
    }
  }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "600 12px/1 var(--font-body)",
      color: "var(--text-h)"
    }
  }, s)))));
}
Object.assign(__ds_scope, { Hero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/aequora-digital-site/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/aequora-digital-site/PricingSection.jsx
try { (() => {
function PricingSection({
  PricingCard,
  onSelect
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "80px 44px",
      background: "var(--surface-sunken)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1000,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 52
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      font: "700 11px/1 var(--font-body)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--navy)",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 2,
      background: "var(--terra)",
      borderRadius: 2
    }
  }), "Pricing"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "var(--text-display-lg)",
      color: "var(--text-h)"
    }
  }, "Simple, transparent pricing.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Reveal, {
    delay: 0
  }, /*#__PURE__*/React.createElement(PricingCard, {
    tier: "Starter",
    price: "1,999",
    note: "one-time \xB7 hosting included",
    features: ["Single-page or opt-in website", "Mobile-responsive design", "Contact form + basic SEO", "Delivered in 10–14 days"],
    ctaLabel: "Get Started",
    onSelect: onSelect
  })), /*#__PURE__*/React.createElement(__ds_scope.Reveal, {
    delay: 90
  }, /*#__PURE__*/React.createElement(PricingCard, {
    tier: "Growth \xB7 Best Value",
    price: "4,999",
    note: "one-time \xB7 hosting included",
    features: ["Up to 10 pages, full site", "Full SEO optimization", "Backend, forms & integrations", "Free 1-month management"],
    ctaLabel: "Get Started",
    featured: true,
    onSelect: onSelect
  })), /*#__PURE__*/React.createElement(__ds_scope.Reveal, {
    delay: 180
  }, /*#__PURE__*/React.createElement(PricingCard, {
    tier: "Managed",
    price: "999",
    note: "per month \xB7 everything included",
    features: ["Hosting & storage covered", "Monthly SEO improvements", "Up to 4 content updates/mo", "Security, backups, support"],
    ctaLabel: "Add to Any Project",
    onSelect: onSelect
  })))));
}
Object.assign(__ds_scope, { PricingSection });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/aequora-digital-site/PricingSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/aequora-digital-site/ServicesSection.jsx
try { (() => {
const SERVICES = [{
  num: "01",
  name: "Website Builds & Redesigns",
  desc: "Full stack, start to finish — front end, database, domain, and hosting as one project. First draft in 48 hours."
}, {
  num: "02",
  name: "Website Management & SEO",
  desc: "Your site stays fast, secure, and shows up higher in Google, every month. Monthly report included."
}, {
  num: "03",
  name: "Google Ads",
  desc: "Get in front of people searching for exactly what you offer — every dollar goes to likely customers."
}, {
  num: "04",
  name: "Membership Portals",
  desc: "Course libraries, subscription dashboards, and progress tracking built for coaches and communities."
}, {
  num: "05",
  name: "E-commerce Sites",
  desc: "Full online stores on Shopify or WooCommerce, easy to manage and built to sell from day one."
}, {
  num: "06",
  name: "Managed VA Services",
  desc: "We match, train, and manage your VA directly, and pay them through us. One flat rate."
}];
function ServicesSection() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "80px 44px",
      background: "var(--surface-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 52
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      font: "700 11px/1 var(--font-body)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--navy)",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 2,
      background: "var(--terra)",
      borderRadius: 2
    }
  }), "What We Do"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "var(--text-display-md)",
      color: "var(--text-h)"
    }
  }, "Two things we're best at \u2014 and four more.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 1,
      background: "var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden"
    }
  }, SERVICES.map((s, i) => /*#__PURE__*/React.createElement(__ds_scope.Reveal, {
    key: s.num,
    delay: i % 3 * 90
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      padding: "32px 28px",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "800 28px/1 var(--font-body)",
      color: "var(--border-default)",
      marginBottom: 12
    }
  }, s.num), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 10px 0",
      font: "700 18px/1.25 var(--font-body)",
      color: "var(--text-h)"
    }
  }, s.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--text-body-sm)",
      color: "var(--text-m)",
      lineHeight: 1.6
    }
  }, s.desc)))))));
}
Object.assign(__ds_scope, { ServicesSection });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/aequora-digital-site/ServicesSection.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.PricingCard = __ds_scope.PricingCard;

__ds_ns.FaqSection = __ds_scope.FaqSection;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.Header = __ds_scope.Header;

__ds_ns.Hero = __ds_scope.Hero;

__ds_ns.PricingSection = __ds_scope.PricingSection;

__ds_ns.Reveal = __ds_scope.Reveal;

__ds_ns.ServicesSection = __ds_scope.ServicesSection;

})();
