import e, { createContext as x, useState as h, useReducer as Q, useRef as P, useMemo as C, useContext as E, useEffect as b } from "react";
import t from "prop-types";
const U = (i, r) => {
  switch (r.type) {
    case "ADD_ITEM":
      return [...i, { ...r.payload, note: "" }];
    case "UPDATE_NOTE":
      return i.map((a) => a.id === r.payload.id ? { ...a, note: r.payload.note } : a);
    case "REMOVE_ITEM":
      return i.filter(({ id: a }) => a !== r.payload);
    default:
      return i;
  }
}, y = x();
function D(i) {
  const {
    children: r,
    tourTitle: a,
    tourDescription: l,
    tourItems: n,
    navPages: s,
    apiSaveEndpoint: o
  } = i, [d, f] = h(a || ""), [u, c] = h(
    l || ""
  ), [v, m] = h(s || []), [p, g] = h(0), [_, T] = Q(
    U,
    n || []
  ), V = P(null), [O, k] = h([]), $ = "https://artic.edu/iiif/2", B = o || "/api/v1/custom-tours", [M, j] = h(!1), L = C(
    () => ({
      note: 255,
      title: 255,
      description: 255,
      items: {
        min: 1,
        max: 6
      }
    }),
    []
  );
  return /* @__PURE__ */ e.createElement(
    y.Provider,
    {
      value: {
        apiSaveEndpoint: B,
        iiifBaseUrl: $,
        limits: L,
        tourTitle: d,
        setTourTitle: f,
        tourDescription: u,
        setTourDescription: c,
        tourItems: _,
        tourItemsDispatch: T,
        navPages: v,
        setNavPages: m,
        activeNavPage: p,
        setActiveNavPage: g,
        navSearchButtonRef: V,
        validityIssues: O,
        setValidityIssues: k,
        isSaving: M,
        setIsSaving: j
      }
    },
    r
  );
}
D.propTypes = {
  apiSaveEndpoint: t.string,
  children: t.node.isRequired,
  tourTitle: t.string,
  tourDescription: t.string,
  tourItems: t.instanceOf(Array),
  navPages: t.instanceOf(Array)
};
y.Provider.propTypes = {
  value: t.shape({
    apiSaveEndpoint: t.string,
    iiifBaseUrl: t.string,
    limits: t.shape({
      note: t.number,
      title: t.number,
      description: t.number,
      items: t.shape({
        min: t.number,
        max: t.number
      })
    }),
    tourItems: t.instanceOf(Array),
    tourItemsDispatch: t.func,
    tourTitle: t.string,
    setTourTitle: t.func,
    tourDescription: t.string,
    setTourDescription: t.func,
    navPages: t.instanceOf(Array),
    setNavPages: t.func,
    activeNavPage: t.number,
    setActiveNavPage: t.func,
    navSearchButtonRef: t.shape({
      current: t.instanceOf(Element)
    }),
    validityIssues: t.arrayOf(t.string),
    setValidityIssues: t.func,
    isSaving: t.bool,
    setIsSaving: t.func
  })
};
function Y() {
  const {
    navPages: i,
    activeNavPage: r,
    setActiveNavPage: a,
    navSearchButtonRef: l,
    isSaving: n
  } = E(y);
  return /* @__PURE__ */ e.createElement("nav", { id: "aic-ct-navigation", "aria-label": "Custom tour navigation" }, i.map((s, o) => /* @__PURE__ */ e.createElement(
    "button",
    {
      ref: s.id === 0 ? l : null,
      key: s.id,
      id: `aic-ct-nav-button-${s.id}`,
      "aria-controls": `aic-ct-nav-page-${s.id}`,
      "aria-pressed": s.id === r,
      type: "button",
      onClick: () => a(o),
      disabled: n
    },
    s.title
  )));
}
function A({ children: i }) {
  const { setNavPages: r } = E(y);
  return b(() => {
    r(
      i ? i.map((a, l) => ({
        id: l,
        title: a.props.title
      })) : []
    );
  }, [i, r]), /* @__PURE__ */ e.createElement("div", { id: "aic-ct-nav-pages" }, i);
}
A.propTypes = {
  children: t.node.isRequired
};
function S(i) {
  const { id: r, children: a } = i, { activeNavPage: l } = E(y);
  return /* @__PURE__ */ e.createElement(
    "div",
    {
      tabIndex: "0",
      id: `aic-ct-nav-page-${r}`,
      "aria-labelledby": `aic-ct-nav-button-${r}`,
      "aria-hidden": l !== r,
      style: l !== r ? { display: "none" } : {}
    },
    a
  );
}
S.propTypes = {
  id: t.number.isRequired,
  title: t.string.isRequired,
  children: t.oneOfType([
    t.arrayOf(t.element),
    t.object
  ]).isRequired
};
const I = x();
function q(i) {
  const {
    children: r,
    searchResultItems: a,
    searchQuery: l,
    searchFetching: n,
    searchError: s
  } = i, [o, d] = h(
    a || null
  ), [f, u] = h(l || ""), [c, v] = h(
    n || !1
  ), [m, p] = h(s || !1);
  return /* @__PURE__ */ e.createElement(
    I.Provider,
    {
      value: {
        searchResultItems: o,
        setSearchResultItems: d,
        searchQuery: f,
        setSearchQuery: u,
        searchFetching: c,
        setSearchFetching: v,
        searchError: m,
        setSearchError: p
      }
    },
    r
  );
}
q.propTypes = {
  children: t.node.isRequired,
  searchResultItems: t.array,
  searchQuery: t.string,
  searchFetching: t.bool,
  searchError: t.oneOfType([t.string, t.bool])
};
I.Provider.propTypes = {
  value: t.shape({
    searchResultItems: t.array,
    setSearchResultItems: t.func,
    searchQuery: t.string,
    setSearchQuery: t.func,
    searchFetching: t.bool,
    setSearchFetching: t.func,
    searchError: t.oneOfType([t.string, t.bool]),
    setSearchError: t.func
  }),
  children: t.node.isRequired
};
function H() {
  const {
    searchQuery: i,
    setSearchQuery: r,
    setSearchResultItems: a,
    setSearchError: l,
    setSearchFetching: n
  } = E(I), [s, o] = h(i), d = (u) => {
    const c = new URL("https://api.artic.edu/api/v1/artworks/search");
    c.searchParams.set("query[bool][must][][term][is_on_view]", "true"), c.searchParams.set(
      "query[bool][must][][exists][field]",
      "description"
    ), c.searchParams.set(
      "query[bool][should][][exists][field]",
      "description"
    ), c.searchParams.set(
      "query[bool][should][][exists][field]",
      "subject_id"
    ), c.searchParams.set("query[bool][should][][exists][field]", "style_id"), c.searchParams.set("query[bool][should][][term][is_boosted]", "true"), c.searchParams.set("query[bool][minimum_should_match]", "1"), c.searchParams.set(
      "fields",
      "artist_title,description,id,image_id,thumbnail,title"
    ), c.searchParams.set("limit", "10"), c.searchParams.set("q", u);
    const v = new AbortController(), m = v.signal;
    if (u === "") {
      a(null), n(!1), l(null);
      return;
    }
    async function p() {
      try {
        const _ = await (await fetch(c, { signal: m })).json();
        a(_.data), n(!1);
      } catch (g) {
        if (g.name === "AbortError")
          return;
        l("Error fetching results"), n(!1);
      }
    }
    return n(!0), p(), () => {
      v.abort();
    };
  }, f = (u) => {
    r(s), d(s), u.preventDefault();
  };
  return /* @__PURE__ */ e.createElement(
    "form",
    {
      id: "aic-ct-search",
      role: "search",
      "aria-label": "Objects for your tour",
      onSubmit: f
    },
    /* @__PURE__ */ e.createElement("label", { htmlFor: "aic-ct-search__input", className: "sr-only" }, "Search the collection"),
    /* @__PURE__ */ e.createElement("br", null),
    /* @__PURE__ */ e.createElement(
      "input",
      {
        id: "aic-ct-search__input",
        type: "search",
        placeholder: "Search",
        value: s,
        onChange: (u) => {
          u.target.value && u.target.setCustomValidity(""), o(u.target.value);
        },
        onInvalid: (u) => {
          u.target.setCustomValidity("You must enter a search term");
        },
        required: !0
      }
    ),
    /* @__PURE__ */ e.createElement("button", { id: "aic-ct-search__button", type: "submit" }, "Search")
  );
}
function F(i, r, a = "", l = "", n = "full", s = !0) {
  return `${i}/${r}/${n}/${s && "!"}${a},${l}/0/default.jpg`;
}
function N(i) {
  const { iiifBaseUrl: r, tourItems: a, tourItemsDispatch: l } = E(y), { itemData: n } = i, [s, o] = h(!1), d = () => {
    l({
      type: s ? "REMOVE_ITEM" : "ADD_ITEM",
      payload: s ? n.id : n
    });
  };
  return b(() => {
    o(a.find((f) => f.id === n.id));
  }, [a, n.id]), /* @__PURE__ */ e.createElement("li", { id: `aic-ct-search__item-${n.id}` }, n.title && /* @__PURE__ */ e.createElement("h2", null, n.title), n.image_id && /* @__PURE__ */ e.createElement(
    "img",
    {
      src: F(r, n.image_id, "240", "240"),
      alt: n.thumbnail.alt_text
    }
  ), n.artist_title && /* @__PURE__ */ e.createElement("p", null, n.artist_title), n.description && /* @__PURE__ */ e.createElement("div", { dangerouslySetInnerHTML: { __html: n.description } }), (a.length < 6 || s) && /* @__PURE__ */ e.createElement(
    "button",
    {
      type: "button",
      onClick: d,
      "aria-pressed": s ? "true" : "false",
      "aria-label": s ? "Remove from tour" : "Add to tour"
    },
    s ? "Remove from tour" : "Add to tour"
  ));
}
N.propTypes = {
  itemData: t.shape({
    id: t.number.isRequired,
    title: t.string.isRequired,
    image_id: t.string,
    thumbnail: t.shape({
      alt_text: t.string
    }),
    artist_title: t.string,
    description: t.string
  })
};
function z() {
  const { searchError: i, searchFetching: r, searchResultItems: a } = E(I);
  return r ? /* @__PURE__ */ e.createElement("div", { id: "aic-ct-search__loading" }, "Loading...") : i ? /* @__PURE__ */ e.createElement("div", { id: "aic-ct-search__error" }, i) : (a == null ? void 0 : a.length) === 0 ? /* @__PURE__ */ e.createElement("div", { id: "aic-ct-search__no-results" }, "Sorry, we couldn’t find any results matching your criteria") : (a == null ? void 0 : a.length) > 0 ? /* @__PURE__ */ e.createElement("ul", { id: "aic-ct-search__results" }, a.map((l) => /* @__PURE__ */ e.createElement(N, { key: l.id, itemData: l }))) : null;
}
function R(i, r) {
  const [a, l] = h(i || ""), n = P(null);
  return {
    value: a,
    onChange: (o) => {
      const { value: d } = o.target;
      n.current.ariaBusy = !0, l(d), n.current.ariaBusy = !1;
    },
    countRef: n,
    charsRemaining: r - a.length,
    maxLength: r
  };
}
function w(i) {
  var p;
  const { itemData: r, itemIndex: a, setShouldAssignFocus: l, setRemoveButtons: n } = i, { iiifBaseUrl: s, tourItems: o, tourItemsDispatch: d, limits: f } = E(y), u = P(null), c = R((p = o[a]) == null ? void 0 : p.note, f.note), v = C(
    () => ({
      id: r.id,
      note: c.value
    }),
    [r.id, c.value]
  ), m = () => {
    d({
      type: "REMOVE_ITEM",
      payload: r.id
    });
  };
  return b(() => {
    d({
      type: "UPDATE_NOTE",
      payload: v
    });
  }, [v, d]), b(() => {
    const g = u.current;
    return () => {
      document.activeElement === g && (o.length > 1 ? o.find((_, T) => {
        _.id === r.id && l({
          flag: !0,
          id: o[T !== o.length - 1 ? T + 1 : T - 1].id
        });
      }) : l({
        flag: !0,
        id: null
      }));
    };
  }, [o, r.id, l]), b(() => (n((g) => [...g, { id: r.id, ref: u }]), () => {
    n(
      (g) => g.filter((_) => _.id !== r.id)
    );
  }), [n, o, r.id]), /* @__PURE__ */ e.createElement("li", { id: `aic-ct-tour__item-${r.id}` }, r.title && /* @__PURE__ */ e.createElement("h2", null, r.title), r.image_id && /* @__PURE__ */ e.createElement(
    "img",
    {
      src: F(s, r.image_id, "240", "240"),
      alt: r.thumbnail.alt_text
    }
  ), r.artist_title && /* @__PURE__ */ e.createElement("p", null, r.artist_title), r.description && /* @__PURE__ */ e.createElement("div", { dangerouslySetInnerHTML: { __html: r.description } }), /* @__PURE__ */ e.createElement("label", { htmlFor: `aic-ct-note-${r.id}` }, "Personal note", " ", /* @__PURE__ */ e.createElement("span", { ref: c.countRef, "aria-live": "polite" }, "(", c.charsRemaining, /* @__PURE__ */ e.createElement("span", { className: "sr-only" }, " characters remaining"), ")")), /* @__PURE__ */ e.createElement("br", null), /* @__PURE__ */ e.createElement(
    "textarea",
    {
      id: `aic-ct-note-${r.id}`,
      onChange: c.onChange,
      rows: "5",
      value: c.value,
      maxLength: c.maxLength
    }
  ), /* @__PURE__ */ e.createElement("br", null), /* @__PURE__ */ e.createElement(
    "button",
    {
      ref: u,
      type: "button",
      onClick: () => {
        m(r.id);
      }
    },
    "Remove from tour"
  ));
}
w.propTypes = {
  itemData: t.shape({
    id: t.number.isRequired,
    title: t.string.isRequired,
    image_id: t.string,
    thumbnail: t.shape({
      alt_text: t.string
    }),
    artist_title: t.string,
    description: t.string
  }),
  itemIndex: t.number.isRequired,
  setRemoveButtons: t.func,
  setShouldAssignFocus: t.func
};
function J() {
  const { tourItems: i, navSearchButtonRef: r } = E(y), [a, l] = h({
    flag: !1,
    id: null
  }), [n, s] = h([]);
  return b(() => {
    a.flag && (!i.length && (r != null && r.current) ? r.current.focus() : n.find((o) => o.id === a.id).ref.current.focus(), l(!1));
  }, [i, a, n, r]), /* @__PURE__ */ e.createElement(e.Fragment, null, i.length > 0 ? /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement("h2", { id: "aic-ct-tour__heading" }, "Your tour"), /* @__PURE__ */ e.createElement("ul", { id: "aic-ct-tour__results" }, i.map((o, d) => /* @__PURE__ */ e.createElement(
    w,
    {
      key: o.id,
      setRemoveButtons: s,
      itemData: o,
      itemIndex: d,
      shouldAssignFocus: a,
      setShouldAssignFocus: l
    }
  )))) : /* @__PURE__ */ e.createElement("div", { id: "aic-ct-tour__no-items" }, "You haven’t added any artworks to your tour yet"));
}
function G() {
  const {
    tourTitle: i,
    setTourTitle: r,
    tourDescription: a,
    setTourDescription: l,
    limits: n
  } = E(y), s = R(i, n.title), o = R(a, n.description);
  return b(() => {
    r(s.value);
  }, [s, r]), b(() => {
    l(o.value);
  }, [o, l]), /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement("div", null, /* @__PURE__ */ e.createElement("label", { htmlFor: "aic-ct-metadata__title" }, "Tour Title", " ", /* @__PURE__ */ e.createElement("span", { ref: s.countRef, "aria-live": "polite" }, "(", s.charsRemaining, /* @__PURE__ */ e.createElement("span", { className: "sr-only" }, " characters remaining"), ")")), /* @__PURE__ */ e.createElement("br", null), /* @__PURE__ */ e.createElement(
    "input",
    {
      type: "text",
      onChange: s.onChange,
      value: s.value,
      id: "aic-ct-metadata__title",
      maxLength: s.maxLength,
      required: !0
    }
  )), /* @__PURE__ */ e.createElement("div", null, /* @__PURE__ */ e.createElement("label", { htmlFor: "aic-ct-metadata__description" }, "Tour Description", " ", /* @__PURE__ */ e.createElement("span", { ref: o.countRef, "aria-live": "polite" }, "(", o.charsRemaining, /* @__PURE__ */ e.createElement("span", { className: "sr-only" }, " characters remaining"), ")")), /* @__PURE__ */ e.createElement("br", null), /* @__PURE__ */ e.createElement(
    "textarea",
    {
      id: "aic-ct-metadata__description",
      onChange: o.onChange,
      rows: "5",
      value: o.value,
      maxLength: o.maxLength
    }
  )));
}
function K() {
  const {
    apiSaveEndpoint: i,
    tourTitle: r,
    tourItems: a,
    tourDescription: l,
    validityIssues: n,
    setValidityIssues: s,
    limits: o,
    isSaving: d,
    setIsSaving: f
  } = E(y), [u, c] = h(null), v = () => {
    f(!0), setTimeout(async () => {
      try {
        const m = await fetch(`${i}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title: r,
            description: l,
            artworks: a.map((g) => ({
              objectNote: g.note,
              ...g
            }))
          })
        });
        if (!m.ok)
          throw new Error(
            "There was a problem saving your tour, please try again. If the problem persists, please contact us and let us know."
          );
        const { message: p } = await m.json();
        c({
          type: "success",
          message: p
        });
      } catch (m) {
        c({
          type: "error",
          message: m.message
        });
      }
      f(!1);
    }, 1e3);
  };
  return b(() => {
    const m = [];
    r.length || m.push("A title is required"), r.length > o.title && m.push("Tour title must not exceed the character limit"), l.length > o.description && m.push(
      "Tour description must not exceed the character limit"
    ), a.length < o.items.min && m.push("At least one item is required"), a.length > o.items.max && m.push("Tours must not contain more than 6 artworks"), a.some((p) => p.note.length > o.note ? (m.push("Notes must not exceed the character limit"), !0) : !1), s(m);
  }, [r, l, a, s, o]), /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement("h2", null, "Submit your tour"), n.length ? /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement("p", null, "Fix these issue before submitting your tour:"), n.length && /* @__PURE__ */ e.createElement("ul", { id: "aic-ct-validation-errors" }, n.map((m, p) => /* @__PURE__ */ e.createElement("li", { key: p }, m)))) : /* @__PURE__ */ e.createElement("div", { id: "aic-ct-validation-success" }, /* @__PURE__ */ e.createElement("div", { tabIndex: "-1", "aria-live": "polite" }, d && /* @__PURE__ */ e.createElement("p", null, "Saving..."), !d && !u && /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement("p", null, "Are you sure you want to submit your tour? You won't be able to make any more changes after this stage"), /* @__PURE__ */ e.createElement(
    "button",
    {
      id: "aic-ct-save-button",
      type: "button",
      onClick: v,
      disabled: d
    },
    "Save my tour"
  )), u && (u.type === "success" && /* @__PURE__ */ e.createElement("div", { id: "aic-ct-save-success" }, /* @__PURE__ */ e.createElement("p", null, u.message)) || u.type === "error" && /* @__PURE__ */ e.createElement("div", { id: "aic-ct-save-error" }, /* @__PURE__ */ e.createElement("p", null, u.message), /* @__PURE__ */ e.createElement(
    "button",
    {
      id: "aic-ct-save-button",
      type: "button",
      onClick: v,
      disabled: d
    },
    "Save my tour"
  ))))));
}
const W = (i) => {
  const { apiSaveEndpoint: r, tourTitle: a, tourDescription: l, tourItems: n } = i, s = {
    apiSaveEndpoint: r,
    tourTitle: a,
    tourDescription: l,
    tourItems: n
  };
  return /* @__PURE__ */ e.createElement(D, { ...s }, /* @__PURE__ */ e.createElement(Y, null), /* @__PURE__ */ e.createElement(A, null, /* @__PURE__ */ e.createElement(S, { id: 0, title: "Search" }, /* @__PURE__ */ e.createElement(q, null, /* @__PURE__ */ e.createElement(H, null), /* @__PURE__ */ e.createElement(z, null))), /* @__PURE__ */ e.createElement(S, { id: 1, title: "Your tour" }, /* @__PURE__ */ e.createElement(G, null), /* @__PURE__ */ e.createElement(J, null)), /* @__PURE__ */ e.createElement(S, { id: 2, title: "Save your tour" }, /* @__PURE__ */ e.createElement(K, null))));
};
W.propTypes = {
  apiSaveEndpoint: t.string,
  tourTitle: t.string,
  tourDescription: t.string,
  tourItems: t.array
};
export {
  W as default
};
