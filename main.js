const andstyle = require("scripts/AndStyle");

var components = [
  {
    name: "Spinner",
    page: {
      views: [
        {
          type: "andstyle_spinner",
          props: {
            color: $color("gray")
          },
          layout: function(make, view) {
            make.center.equalTo(view.super);
            make.size.equalTo(50);
          }
        }
      ]
    }
  },
  {
    name: "Button",
    page: {
      views: [
        {
          type: "andstyle_button",
          props: {
            title: "Button",
            ripple_duration: 0.7
          },
          layout: function(make, view) {
            make.center.equalTo(view.super);
            make.width.equalTo(100);
            make.height.equalTo(40);
          },
          events: {
            tapped: function(sender) {
              andstyle.setAttribute(sender, "title", "Tapped");
            }
          }
        }
      ]
    }
  },
  {
    name: "SettingList",
    page: {
      views: [
        {
          type: "SettingList",
          props: {
            data: [
              {
                title: "Section 0",
                rows: ["0-0", "0-1", "0-2"]
              },
              {
                title: "Section 1",
                rows: ["1-0", "1-1", "1-2"]
              }
            ]
          },
          layout: $layout.fill,
          events: {
            didSelect: function(tableView, indexPath, item) {
              andstyle.alert(item.title.text);
            }
          }
        }
      ]
    }
  },
  {
    name: "Slider",
    page: {
      views: [
        {
          type: "andstyle_slider",
          props: {
            value: 0.5,
            max: 1.0,
            min: 0.0
          },
          layout: function(make, view) {
            make.center.equalTo(view.super);
            make.width.equalTo(200);
          },
          events: {
            changed: function(sender) {
              console.log(sender.value);
            }
          }
        }
      ]
    }
  },
  {
    name: "TabLayout & ViewPager",
    page: {
      props: {
        navBarHidden: true,
        bgcolor: $color("tint")
      },
      views: [
        {
          type: "TabLayout",
          props: {
            id: "tabLayout",
            tabs: ["Page1", "Page2", "Page3"],
            bgcolor: $color("tint"),
            setupWithViewPager: "viewPager"
          },
          layout: (make, view) => {
            make.top.right.left.equalTo(view.super.safeArea);
            make.height.equalTo(50);
          },
          events: {
            onTabSelected: (index, title) => {
              console.log(index, title);
            }
          }
        },
        {
          type: "ViewPager",
          props: {
            id: "viewPager",
            setupWithTabLayout: "tabLayout",
            pages: [
              {
                props: {
                  bgcolor: $color("lightGray")
                },
                views: [
                  {
                    type: "label",
                    props: {
                      text: "Page1"
                    },
                    layout: $layout.center
                  }
                ]
              },
              {
                props: {
                  bgcolor: $color("lightGray")
                },
                views: [
                  {
                    type: "label",
                    props: {
                      text: "Page2"
                    },
                    layout: $layout.center
                  }
                ]
              },
              {
                props: {
                  bgcolor: $color("lightGray")
                },
                views: [
                  {
                    type: "label",
                    props: {
                      text: "Page3"
                    },
                    layout: $layout.center
                  }
                ]
              }
            ]
          },
          layout: (make, view) => {
            make.right.left.bottom.inset(0);
            make.top.equalTo(view.prev.bottom);
          }
        }
      ]
    }
  },
  {
    name: "Input",
    page: {
      views: [
        {
          type: "list",
          props: {
            data: [
              {
                title: "Default",
                rows: [
                  {
                    type: "andstyle_input",
                    props: {
                      type: $kbType.search,
                      darkKeyboard: true
                    },
                    layout: function(make, view) {
                      make.center.equalTo(view.super);
                      make.height.equalTo(32);
                      make.left.right.inset(20);
                    }
                  }
                ]
              },
              {
                title: "Secure",
                rows: [
                  {
                    type: "andstyle_input",
                    props: {
                      placeholder: "Placeholder text",
                      secure: true
                    },
                    layout: function(make, view) {
                      make.center.equalTo(view.super);
                      make.height.equalTo(32);
                      make.left.right.inset(20);
                    }
                  }
                ]
              }
            ]
          },
          layout: $layout.fill
        }
      ]
    }
  }
];

var api = [
  {
    name: "hintView",
    run: async function() {
      let message = await andstyle.hintView("title", "button", "text");
      console.log(message);
    }
  },
  {
    name: "Loading View",
    run: async function() {
      andstyle.startLoading($color("white"), $color("black"));
      await $wait(1);
      andstyle.stopLoading();
    }
  },
  {
    name: "Alert",
    run: async function() {
      $ui.loading(true);
      let data = await $http.get("https://api.ooopn.com/yan/api.php");
      $ui.loading(false);
      data = data.data;
      let message = `${data.hitokoto}\n\nby ${data.author}（${data.source}）`;
      andstyle.alert({
        message: message,
        shadowColor: "black",
        bgcolor: $color("black"),
        textColor: $color("white"),
        actions: [
          {
            title: "Copy",
            color: $color("white"),
            handler: () => {
              $clipboard.text = message.replace(/\n/g, " ");
              andstyle.dismissAlert();
            }
          },
          {
            title: "Cancel",
            color: $color("white"),
            handler: () => {
              andstyle.dismissAlert();
            }
          }
        ]
      });
    }
  }
];

components.forEach(function(item) {
  if (item.page) {
    if (!item.page.props) {
      item.page.props = {
        title: item.name
      };
    }
  }
});

andstyle.render({
  props: {
    title: "AndStyle"
  },
  views: [
    {
      type: "SettingList",
      props: {
        id: "main-list",
        stickyHeader: false
      },
      layout: $layout.fill,
      events: {
        didSelect: function(tableView, indexPath, item) {
          if (indexPath.section == 0) {
            andstyle.push(components[indexPath.row].page);
          } else api[indexPath.row].run();
        }
      }
    }
  ]
});

var data = [
  {
    title: "COMPONENTS",
    rows: components.map(function(item) {
      return item.name;
    })
  },
  {
    title: "API",
    rows: api.map(function(item) {
      return item.name;
    })
  }
];

andstyle.setAttribute($("main-list"), "data", data);
