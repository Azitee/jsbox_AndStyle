"use strict";

require("scripts/AndStyle/main");

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
              $ui.andstyle.setAttribute(sender, "title", "Tapped");
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
                rows: [
                  "0-0",
                  "0-1",
                  {
                    type: "switch",
                    title: "0-2",
                    on: false,
                    changed: sender => {
                      $ui.andstyle.alert(sender.on);
                    }
                  }
                ]
              },
              {
                title: "Section 1",
                rows: [
                  "1-0",
                  "1-1",
                  {
                    title: "1-2",
                    type: "tab",
                    index: 0,
                    items: ["item1", "item2", "item3"],
                    changed: sender => {
                      $ui.andstyle.alert(sender.items[sender.index]);
                    }
                  }
                ]
              }
            ]
          },
          layout: $layout.fill,
          events: {
            didSelect: function(tableView, indexPath, item) {
              $ui.andstyle.alert(item.title.text);
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
            make.height.equalTo(20);
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
                rows: $ui.andstyle.changeStyle([
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
                ])
              },
              {
                title: "Secure",
                rows: $ui.andstyle.changeStyle([
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
                ])
              }
            ]
          },
          layout: $layout.fill
        }
      ]
    }
  },
  {
    name: "Video",
    page: {
      views: [
        {
          type: "andstyle_button",
          props: {
            title: "Play",
            frame: $rect(10, 10, 50, 30)
          },
          events: {
            tapped: () => {
              $("player").notify({
                event: "play"
              });
            }
          }
        },
        {
          type: "andstyle_button",
          props: {
            title: "Pause",
            frame: $rect(70, 10, 50, 30)
          },
          events: {
            tapped: () => {
              $("player").notify({
                event: "pause"
              });
            }
          }
        },
        {
          type: "andstyle_button",
          props: {
            title: "2X",
            frame: $rect(130, 10, 50, 30)
          },
          events: {
            tapped: () => {
              $("player").notify({
                event: "setRate",
                message: {
                  rate: 2
                }
              });
            }
          }
        },
        {
          type: "andstyle_slider",
          props: {
            id: "slider"
          },
          layout: function(make, view) {
            make.top.equalTo(view.prev.bottom).offset(5);
            make.right.left.inset(10);
            make.height.equalTo(20);
          },
          events: {
            changed: function(sender) {
              $("player").notify({
                event: "setProgress",
                message: {
                  time: $("player").info * sender.value
                }
              });
            }
          }
        },
        {
          type: "andstyle_video",
          props: {
            id: "player",
            src:
              "https://images.apple.com/media/cn/ipad-pro/2017/43c41767_0723_4506_889f_0180acc13482/films/feature/ipad-pro-feature-cn-20170605_1280x720h.mp4",
            controls: true
          },
          layout: (make, view) => {
            let width = $device.info.screen.width,
              height = $device.info.screen.height;
            make.left.right.inset(0);
            make.centerY.equalTo(view.super);
            make.height.equalTo(
              (width * 9) / 16 > height ? height - 50 : (width * 9) / 16
            );
          },
          events: {
            ready: sender => {
              $timer.schedule({
                interval: 1,
                handler: function() {
                  sender.notify({
                    event: "getCurrentTime"
                  });
                }
              });
            },
            getCurrentTime: obj => {
              $("slider").value = obj.current / obj.total;
              $("player").info = obj.total;
            }
          }
        }
      ]
    }
  },
  {
    name: "Custom Component",
    run: function() {
      class Linger extends $ui.andstyle.Component {
        constructor(obj) {
          super(obj);
          this.events.draw = (view, ctx) => {
            let height = view.frame.height,
              width = view.frame.width,
              centerY = height / 2,
              centerX = width / 2;
            ctx.fillColor = ctx.strokeColor = obj.props.fillColor
            ctx.setLineWidth(3);
            ctx.beginPath();
            //轮廓
            ctx.addArc(centerX, centerY, 100, 0, Math.PI * 2, false);
            ctx.strokePath();
            //左眼
            ctx.addArc(centerX - 40, centerY - 20, 15, 0, Math.PI * 2, false);
            ctx.fillPath();
            //右眼
            ctx.addArc(centerX + 40, centerY - 20, 15, 0, Math.PI * 2, false);
            ctx.fillPath();
            //左瓣嘴
            ctx.addArc(
              centerX - 10,
              centerY + 30,
              10,
              Math.PI * 2,
              Math.PI,
              false
            );
            ctx.strokePath();
            //右瓣嘴
            ctx.addArc(
              centerX + 10,
              centerY + 30,
              10,
              Math.PI * 2,
              Math.PI,
              false
            );
            ctx.strokePath();
            ctx.fillColor = $color("white");
            //左眼高光
            ctx.addArc(centerX - 45, centerY - 25, 5, 0, Math.PI * 2, false);
            ctx.fillPath();
            //右高光
            ctx.addArc(centerX + 35, centerY - 25, 5, 0, Math.PI * 2, false);
            ctx.fillPath();
          };
        }
      }
      $ui.andstyle.addComponent(Linger, "Linger", "canvas");
      $ui.andstyle.push({
        views: [
          {
            type: "Linger",
            props: {
              fillColor: $color("black")
            },
            layout: $layout.fill
          }
        ]
      });
    }
  }
];

var api = [
  {
    name: "hintView",
    run: async function() {
      let message = await $ui.andstyle.hintView("title", "button", "text");
      console.log(message);
    }
  },
  {
    name: "Loading View",
    run: async function() {
      $ui.andstyle.startLoading($color("white"), $color("black"));
      await $wait(1);
      $ui.andstyle.stopLoading();
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
      $ui.andstyle.alert({
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
              $ui.andstyle.dismissAlert();
            }
          },
          {
            title: "Cancel",
            color: $color("white"),
            handler: () => {
              $ui.andstyle.dismissAlert();
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

$ui.andstyle.render({
  props: {
    title: "AndStyle"
  },
  views: [
    {
      type: "SettingList",
      props: {
        id: "main-list",
        stickyHeader: false,
        data: data
      },
      layout: $layout.fill,
      events: {
        didSelect: function(tableView, indexPath, item) {
          if (indexPath.section == 0) {
            if (indexPath.row == components.length - 1) {
              components[indexPath.row].run();
            } else $ui.andstyle.push(components[indexPath.row].page);
          } else api[indexPath.row].run();
        }
      }
    }
  ]
});
