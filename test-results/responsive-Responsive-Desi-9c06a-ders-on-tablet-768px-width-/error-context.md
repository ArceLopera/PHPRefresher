# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: responsive.spec.js >> Responsive Design >> page renders on tablet (768px width)
- Location: tests\responsive.spec.js:17:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('main, article, .md-content')
Expected: visible
Error: strict mode violation: locator('main, article, .md-content') resolved to 3 elements:
    1) <main class="md-main" data-md-component="main">…</main> aka getByRole('main')
    2) <div class="md-content" data-md-component="content">…</div> aka locator('div').filter({ hasText: 'Welcome to PHP Refresher Last' }).nth(2)
    3) <article class="md-content__inner md-typeset">…</article> aka getByText('Welcome to PHP Refresher Last')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('main, article, .md-content')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#welcome-to-php-refresher"
  - banner [ref=e3]:
    - navigation "Header" [ref=e4]:
      - img [ref=e6] [cursor=pointer]
      - generic [ref=e9]:
        - generic [ref=e11]: PHP Refresher
        - generic:
          - generic: Home
      - generic [ref=e12]:
        - radio "Switch to dark mode"
        - generic "Switch to dark mode" [ref=e13] [cursor=pointer]:
          - img [ref=e14]
        - radio "Switch to light mode"
      - img [ref=e17] [cursor=pointer]
      - dialog:
        - search:
          - generic:
            - textbox "Search" [ref=e19]
            - img [ref=e21] [cursor=pointer]
            - navigation "Search":
              - button "Clear":
                - img
          - generic:
            - generic:
              - generic:
                - generic [ref=e23]: Initializing search
                - list
  - generic [ref=e24]:
    - main [ref=e25]:
      - generic [ref=e26]:
        - navigation "Navigation" [ref=e29]:
          - generic [ref=e30] [cursor=pointer]:
            - link "PHP Refresher" [ref=e31]:
              - /url: .
              - img "logo" [ref=e32]
            - text: PHP Refresher
          - link "ArceLopera/PHPRefresher" [ref=e34] [cursor=pointer]:
            - /url: https://github.com/ArceLopera/PHPRefresher
            - img [ref=e36]
            - generic [ref=e38]: ArceLopera/PHPRefresher
          - list [ref=e39]:
            - listitem [ref=e40]:
              - link "Home" [ref=e41] [cursor=pointer]:
                - /url: .
            - listitem [ref=e42]:
              - generic [ref=e43] [cursor=pointer]: Getting Started
              - navigation "Getting Started" [ref=e45]:
                - generic [ref=e46] [cursor=pointer]: Getting Started
                - list [ref=e48]:
                  - listitem [ref=e49]:
                    - link "Introduction" [ref=e50] [cursor=pointer]:
                      - /url: getting-started-index/
                  - listitem [ref=e51]:
                    - link "Environment Setup" [ref=e52] [cursor=pointer]:
                      - /url: getting-started-setup/
                  - listitem [ref=e53]:
                    - link "Your First Script" [ref=e54] [cursor=pointer]:
                      - /url: getting-started-first-script/
            - listitem [ref=e55]:
              - generic [ref=e56] [cursor=pointer]: Best Practices
              - navigation "Best Practices" [ref=e58]:
                - generic [ref=e59] [cursor=pointer]: Best Practices
                - list [ref=e61]:
                  - listitem [ref=e62]:
                    - link "Overview" [ref=e63] [cursor=pointer]:
                      - /url: best-practices-index/
                  - listitem [ref=e64]:
                    - link "Security Essentials" [ref=e65] [cursor=pointer]:
                      - /url: best-practices-security/
                  - listitem [ref=e66]:
                    - link "Error Handling" [ref=e67] [cursor=pointer]:
                      - /url: best-practices-error-handling/
            - listitem [ref=e68]:
              - generic [ref=e69] [cursor=pointer]: Basics
              - navigation "Basics" [ref=e71]:
                - generic [ref=e72] [cursor=pointer]: Basics
                - list [ref=e74]:
                  - listitem [ref=e75]:
                    - link "General" [ref=e76] [cursor=pointer]:
                      - /url: phpRefresh/
                  - listitem [ref=e77]:
                    - generic [ref=e78] [cursor=pointer]: Variables and Assignments
                    - navigation "Variables and Assignments" [ref=e80]:
                      - generic [ref=e81] [cursor=pointer]: Variables and Assignments
                      - list [ref=e83]:
                        - listitem [ref=e84]:
                          - link "Variables" [ref=e85] [cursor=pointer]:
                            - /url: PR/phpVar1/
                        - listitem [ref=e86]:
                          - link "Data Types and Casting" [ref=e87] [cursor=pointer]:
                            - /url: PR/phpVar2/
                        - listitem [ref=e88]:
                          - link "Variable Scope" [ref=e89] [cursor=pointer]:
                            - /url: PR/phpVar3/
                        - listitem [ref=e90]:
                          - link "Variable Handling" [ref=e91] [cursor=pointer]:
                            - /url: PR/phpVar4/
                  - listitem [ref=e92]:
                    - link "Constant" [ref=e93] [cursor=pointer]:
                      - /url: PR/phpConst/
                  - listitem [ref=e94]:
                    - link "Globals" [ref=e95] [cursor=pointer]:
                      - /url: PR/phpSuperGlobals/
                  - listitem [ref=e96]:
                    - link "Forms" [ref=e97] [cursor=pointer]:
                      - /url: PR/phpForms/
                  - listitem [ref=e98]:
                    - generic [ref=e99] [cursor=pointer]: Strings
                    - navigation "Strings" [ref=e101]:
                      - generic [ref=e102] [cursor=pointer]: Strings
                      - list [ref=e104]:
                        - listitem [ref=e105]:
                          - link "Basics" [ref=e106] [cursor=pointer]:
                            - /url: PR/phpStr/
                        - listitem [ref=e107]:
                          - link "Functions" [ref=e108] [cursor=pointer]:
                            - /url: PR/phpStr1/
                  - listitem [ref=e109]:
                    - generic [ref=e110] [cursor=pointer]: Numbers
                    - navigation "Numbers" [ref=e112]:
                      - generic [ref=e113] [cursor=pointer]: Numbers
                      - list [ref=e115]:
                        - listitem [ref=e116]:
                          - link "Basics" [ref=e117] [cursor=pointer]:
                            - /url: PR/phpNum1/
                        - listitem [ref=e118]:
                          - link "Functions" [ref=e119] [cursor=pointer]:
                            - /url: PR/phpMath1/
                  - listitem [ref=e120]:
                    - link "Operators" [ref=e121] [cursor=pointer]:
                      - /url: PR/phpOperators1/
                  - listitem [ref=e122]:
                    - generic [ref=e123] [cursor=pointer]: Control Flow
                    - navigation "Control Flow" [ref=e125]:
                      - generic [ref=e126] [cursor=pointer]: Control Flow
                      - list [ref=e128]:
                        - listitem [ref=e129]:
                          - link "Conditionals" [ref=e130] [cursor=pointer]:
                            - /url: PR/phpIF/
                        - listitem [ref=e131]:
                          - link "Loops" [ref=e132] [cursor=pointer]:
                            - /url: PR/phpLoops/
                  - listitem [ref=e133]:
                    - link "Keywords" [ref=e134] [cursor=pointer]:
                      - /url: PR/phpKeywords/
            - listitem [ref=e135]:
              - generic [ref=e136] [cursor=pointer]: Functions
              - navigation "Functions" [ref=e138]:
                - generic [ref=e139] [cursor=pointer]: Functions
                - list [ref=e141]:
                  - listitem [ref=e142]:
                    - generic [ref=e143] [cursor=pointer]: Built-in
                    - navigation "Built-in" [ref=e145]:
                      - generic [ref=e146] [cursor=pointer]: Built-in
                      - list [ref=e148]:
                        - listitem [ref=e149]:
                          - link "All" [ref=e150] [cursor=pointer]:
                            - /url: Func/phpAll/
                        - listitem [ref=e151]:
                          - generic [ref=e152] [cursor=pointer]: Time n Date
                          - navigation "Time n Date" [ref=e154]:
                            - generic [ref=e155] [cursor=pointer]: Time n Date
                            - list [ref=e157]:
                              - listitem [ref=e158]:
                                - link "Date/Time" [ref=e159] [cursor=pointer]:
                                  - /url: Func/phpDate/
                              - listitem [ref=e160]:
                                - link "Calendar" [ref=e161] [cursor=pointer]:
                                  - /url: Func/phpCalendar/
                        - listitem [ref=e162]:
                          - link "Regex" [ref=e163] [cursor=pointer]:
                            - /url: Func/phpRegex/
                        - listitem [ref=e164]:
                          - generic [ref=e165] [cursor=pointer]: Network
                          - navigation "Network" [ref=e167]:
                            - generic [ref=e168] [cursor=pointer]: Network
                            - list [ref=e170]:
                              - listitem [ref=e171]:
                                - link "Cookies" [ref=e172] [cursor=pointer]:
                                  - /url: Func/phpCookie/
                              - listitem [ref=e173]:
                                - link "Sessions" [ref=e174] [cursor=pointer]:
                                  - /url: Func/phpSessions/
                              - listitem [ref=e175]:
                                - link "FTP" [ref=e176] [cursor=pointer]:
                                  - /url: Func/phpFTP/
                              - listitem [ref=e177]:
                                - link "Mail" [ref=e178] [cursor=pointer]:
                                  - /url: Func/phpMail/
                        - listitem [ref=e179]:
                          - link "Filters" [ref=e180] [cursor=pointer]:
                            - /url: Func/phpFilters/
                        - listitem [ref=e181]:
                          - link "Callback" [ref=e182] [cursor=pointer]:
                            - /url: Func/phpCallback/
                        - listitem [ref=e183]:
                          - link "JSON" [ref=e184] [cursor=pointer]:
                            - /url: Func/phpJSON/
                        - listitem [ref=e185]:
                          - generic [ref=e186] [cursor=pointer]: Error and Exceptions
                          - navigation "Error and Exceptions" [ref=e188]:
                            - generic [ref=e189] [cursor=pointer]: Error and Exceptions
                            - list [ref=e191]:
                              - listitem [ref=e192]:
                                - link "Errors" [ref=e193] [cursor=pointer]:
                                  - /url: Func/phpError/
                              - listitem [ref=e194]:
                                - link "Exceptions" [ref=e195] [cursor=pointer]:
                                  - /url: Func/phpExceptions/
                        - listitem [ref=e196]:
                          - link "Config Variables" [ref=e197] [cursor=pointer]:
                            - /url: Func/phpConfVar/
                        - listitem [ref=e198]:
                          - link "Declare" [ref=e199] [cursor=pointer]:
                            - /url: Func/phpDeclare/
                        - listitem [ref=e200]:
                          - link "Empty" [ref=e201] [cursor=pointer]:
                            - /url: Func/phpEmpty/
                        - listitem [ref=e202]:
                          - link "Misc" [ref=e203] [cursor=pointer]:
                            - /url: Func/phpMisc/
                        - listitem [ref=e204]:
                          - link "Output Control" [ref=e205] [cursor=pointer]:
                            - /url: Func/phpOutput/
                  - listitem [ref=e206]:
                    - generic [ref=e207] [cursor=pointer]: User-Defined
                    - navigation "User-Defined" [ref=e209]:
                      - generic [ref=e210] [cursor=pointer]: User-Defined
                      - list [ref=e212]:
                        - listitem [ref=e213]:
                          - link "General" [ref=e214] [cursor=pointer]:
                            - /url: Func/phpUserFunc/
                        - listitem [ref=e215]:
                          - link "Arrow Function" [ref=e216] [cursor=pointer]:
                            - /url: Func/phpArrowFunc/
                        - listitem [ref=e217]:
                          - link "Generators" [ref=e218] [cursor=pointer]:
                            - /url: Func/phpGenerators/
            - listitem [ref=e219]:
              - generic [ref=e220] [cursor=pointer]: Data Structures
              - navigation "Data Structures" [ref=e222]:
                - generic [ref=e223] [cursor=pointer]: Data Structures
                - list [ref=e225]:
                  - listitem [ref=e226]:
                    - generic [ref=e227] [cursor=pointer]: Core
                    - navigation "Core" [ref=e229]:
                      - generic [ref=e230] [cursor=pointer]: Core
                      - list [ref=e232]:
                        - listitem [ref=e233]:
                          - link "Array" [ref=e234] [cursor=pointer]:
                            - /url: DS/phpArray/
                        - listitem [ref=e235]:
                          - link "Iterables" [ref=e236] [cursor=pointer]:
                            - /url: DS/phpIterables/
                  - listitem [ref=e237]:
                    - generic [ref=e238] [cursor=pointer]: SPL Collections
                    - navigation "SPL Collections" [ref=e240]:
                      - generic [ref=e241] [cursor=pointer]: SPL Collections
                      - list [ref=e243]:
                        - listitem [ref=e244]:
                          - link "Fixed Array" [ref=e245] [cursor=pointer]:
                            - /url: DS/phpSplFixedArray/
                        - listitem [ref=e246]:
                          - link "Doubly-Linked List" [ref=e247] [cursor=pointer]:
                            - /url: DS/phpSplDoublyLinkedList/
                        - listitem [ref=e248]:
                          - link "Queue" [ref=e249] [cursor=pointer]:
                            - /url: DS/phpSplQueue/
                        - listitem [ref=e250]:
                          - link "Stack" [ref=e251] [cursor=pointer]:
                            - /url: DS/phpSplStack/
                  - listitem [ref=e252]:
                    - generic [ref=e253] [cursor=pointer]: SPL Advanced
                    - navigation "SPL Advanced" [ref=e255]:
                      - generic [ref=e256] [cursor=pointer]: SPL Advanced
                      - list [ref=e258]:
                        - listitem [ref=e259]:
                          - link "Heap" [ref=e260] [cursor=pointer]:
                            - /url: DS/phpSplHeap/
                        - listitem [ref=e261]:
                          - link "Object Storage" [ref=e262] [cursor=pointer]:
                            - /url: DS/phpSplObjectStorage/
                        - listitem [ref=e263]:
                          - link "File Object" [ref=e264] [cursor=pointer]:
                            - /url: DS/phpSplSplFileObject/
            - listitem [ref=e265]:
              - generic [ref=e266] [cursor=pointer]: Classes
              - navigation "Classes" [ref=e268]:
                - generic [ref=e269] [cursor=pointer]: Classes
                - list [ref=e271]:
                  - listitem [ref=e272]:
                    - link "OOP" [ref=e273] [cursor=pointer]:
                      - /url: Classes/phpCls/
                  - listitem [ref=e274]:
                    - link "Constructor" [ref=e275] [cursor=pointer]:
                      - /url: Classes/phpConstructor/
                  - listitem [ref=e276]:
                    - link "Access Modifiers" [ref=e277] [cursor=pointer]:
                      - /url: Classes/phpModifiers/
                  - listitem [ref=e278]:
                    - link "Inheritance" [ref=e279] [cursor=pointer]:
                      - /url: Classes/phpInheritance/
                  - listitem [ref=e280]:
                    - link "Constants" [ref=e281] [cursor=pointer]:
                      - /url: Classes/phpConstants/
                  - listitem [ref=e282]:
                    - link "Abstract Classes" [ref=e283] [cursor=pointer]:
                      - /url: Classes/phpAbstract/
                  - listitem [ref=e284]:
                    - link "Interfaces" [ref=e285] [cursor=pointer]:
                      - /url: Classes/phpInterfaces/
                  - listitem [ref=e286]:
                    - link "Traits" [ref=e287] [cursor=pointer]:
                      - /url: Classes/phpTraits/
                  - listitem [ref=e288]:
                    - link "Static" [ref=e289] [cursor=pointer]:
                      - /url: Classes/phpStatic/
                  - listitem [ref=e290]:
                    - link "Namespaces" [ref=e291] [cursor=pointer]:
                      - /url: Classes/phpNamespaces/
                  - listitem [ref=e292]:
                    - link "Enums" [ref=e293] [cursor=pointer]:
                      - /url: Classes/phpEnums/
                  - listitem [ref=e294]:
                    - link "Attributes" [ref=e295] [cursor=pointer]:
                      - /url: Classes/phpAttributes/
            - listitem [ref=e296]:
              - generic [ref=e297] [cursor=pointer]: Advanced
              - navigation "Advanced" [ref=e299]:
                - generic [ref=e300] [cursor=pointer]: Advanced
                - list [ref=e302]:
                  - listitem [ref=e303]:
                    - generic [ref=e304] [cursor=pointer]: Language Features
                    - navigation "Language Features" [ref=e306]:
                      - generic [ref=e307] [cursor=pointer]: Language Features
                      - list [ref=e309]:
                        - listitem [ref=e310]:
                          - link "Include" [ref=e311] [cursor=pointer]:
                            - /url: Adv/phpInclude/
                        - listitem [ref=e312]:
                          - link "Goto" [ref=e313] [cursor=pointer]:
                            - /url: Adv/phpGoto/
                        - listitem [ref=e314]:
                          - link "File Management" [ref=e315] [cursor=pointer]:
                            - /url: Adv/phpFile/
                  - listitem [ref=e316]:
                    - generic [ref=e317] [cursor=pointer]: Database & Data
                    - navigation "Database & Data" [ref=e319]:
                      - generic [ref=e320] [cursor=pointer]: Database & Data
                      - list [ref=e322]:
                        - listitem [ref=e323]:
                          - link "MySQL" [ref=e324] [cursor=pointer]:
                            - /url: Adv/phpMySql/
                        - listitem [ref=e325]:
                          - link "XML" [ref=e326] [cursor=pointer]:
                            - /url: Adv/phpXML/
                        - listitem [ref=e327]:
                          - link "Zip" [ref=e328] [cursor=pointer]:
                            - /url: Adv/phpZip/
                  - listitem [ref=e329]:
                    - generic [ref=e330] [cursor=pointer]: Development Tools
                    - navigation "Development Tools" [ref=e332]:
                      - generic [ref=e333] [cursor=pointer]: Development Tools
                      - list [ref=e335]:
                        - listitem [ref=e336]:
                          - generic [ref=e337] [cursor=pointer]: Dependency Management
                          - navigation "Dependency Management" [ref=e339]:
                            - generic [ref=e340] [cursor=pointer]: Dependency Management
                            - list [ref=e342]:
                              - listitem [ref=e343]:
                                - link "Composer" [ref=e344] [cursor=pointer]:
                                  - /url: Adv/phpcomposer/
                              - listitem [ref=e345]:
                                - link "Node.js/npm" [ref=e346] [cursor=pointer]:
                                  - /url: Adv/phpnpm/
                        - listitem [ref=e347]:
                          - generic [ref=e348] [cursor=pointer]: Code Analysis
                          - navigation "Code Analysis" [ref=e350]:
                            - generic [ref=e351] [cursor=pointer]: Code Analysis
                            - list [ref=e353]:
                              - listitem [ref=e354]:
                                - link "Phpstan" [ref=e355] [cursor=pointer]:
                                  - /url: Adv/phpstan/
                        - listitem [ref=e356]:
                          - generic [ref=e357] [cursor=pointer]: Database Tools
                          - navigation "Database Tools" [ref=e359]:
                            - generic [ref=e360] [cursor=pointer]: Database Tools
                            - list [ref=e362]:
                              - listitem [ref=e363]:
                                - link "Adminer" [ref=e364] [cursor=pointer]:
                                  - /url: Adv/phpAdminer/
                              - listitem [ref=e365]:
                                - link "Mailhog" [ref=e366] [cursor=pointer]:
                                  - /url: Adv/phpMailhog/
                        - listitem [ref=e367]:
                          - generic [ref=e368] [cursor=pointer]: Configuration & DevOps
                          - navigation "Configuration & DevOps" [ref=e370]:
                            - generic [ref=e371] [cursor=pointer]: Configuration & DevOps
                            - list [ref=e373]:
                              - listitem [ref=e374]:
                                - link "Tiller" [ref=e375] [cursor=pointer]:
                                  - /url: Adv/phpTiller/
                              - listitem [ref=e376]:
                                - link "Vault" [ref=e377] [cursor=pointer]:
                                  - /url: Adv/phpVault/
                  - listitem [ref=e378]:
                    - generic [ref=e379] [cursor=pointer]: Web Services
                    - navigation "Web Services" [ref=e381]:
                      - generic [ref=e382] [cursor=pointer]: Web Services
                      - list [ref=e384]:
                        - listitem [ref=e385]:
                          - link "Ajax" [ref=e386] [cursor=pointer]:
                            - /url: Adv/phpAjax/
            - listitem [ref=e387]:
              - generic [ref=e388] [cursor=pointer]: Moodle
              - navigation "Moodle" [ref=e390]:
                - generic [ref=e391] [cursor=pointer]: Moodle
                - list [ref=e393]:
                  - listitem [ref=e394]:
                    - link "Basics" [ref=e395] [cursor=pointer]:
                      - /url: Moodle/phpMoodle/
                  - listitem [ref=e396]:
                    - link "Installation" [ref=e397] [cursor=pointer]:
                      - /url: Moodle/phpMoodleInstall/
                  - listitem [ref=e398]:
                    - generic [ref=e399] [cursor=pointer]: Plugin Types
                    - navigation "Plugin Types" [ref=e401]:
                      - generic [ref=e402] [cursor=pointer]: Plugin Types
                      - list [ref=e404]:
                        - listitem [ref=e405]:
                          - link "General" [ref=e406] [cursor=pointer]:
                            - /url: Moodle/phpMoodlePluginTypes/
                        - listitem [ref=e407]:
                          - link "Activity" [ref=e408] [cursor=pointer]:
                            - /url: Moodle/Plugin/phpMoodlePlugin_mod/
                        - listitem [ref=e409]:
                          - generic [ref=e410] [cursor=pointer]: Question
                          - navigation "Question" [ref=e412]:
                            - generic [ref=e413] [cursor=pointer]: Question
                            - list [ref=e415]:
                              - listitem [ref=e416]:
                                - link "Question Types" [ref=e417] [cursor=pointer]:
                                  - /url: Moodle/Plugin/phpMoodlePlugin_qtypes/
                              - listitem [ref=e418]:
                                - link "Question Format" [ref=e419] [cursor=pointer]:
                                  - /url: Moodle/Plugin/phpMoodlePlugin_qformat/
                              - listitem [ref=e420]:
                                - link "Question Bank" [ref=e421] [cursor=pointer]:
                                  - /url: Moodle/Plugin/phpMoodlePlugin_qbank/
                              - listitem [ref=e422]:
                                - link "Question Behavior" [ref=e423] [cursor=pointer]:
                                  - /url: Moodle/Plugin/phpMoodlePlugin_qbehavior/
                        - listitem [ref=e424]:
                          - link "Book Tool" [ref=e425] [cursor=pointer]:
                            - /url: Moodle/Plugin/phpMoodlePlugin_booktool/
                        - listitem [ref=e426]:
                          - link "Database Fields" [ref=e427] [cursor=pointer]:
                            - /url: Moodle/Plugin/phpMoodlePlugin_datafield/
                  - listitem [ref=e428]:
                    - link "Skeleton" [ref=e429] [cursor=pointer]:
                      - /url: Moodle/phpMoodlePluginSkeleton/
                  - listitem [ref=e430]:
                    - link "Common Files" [ref=e431] [cursor=pointer]:
                      - /url: Moodle/phpMoodlePluginFiles/
                  - listitem [ref=e432]:
                    - link "XMLDB Editor" [ref=e433] [cursor=pointer]:
                      - /url: Moodle/phpMoodleXMLDB/
                  - listitem [ref=e434]:
                    - link "Templates" [ref=e435] [cursor=pointer]:
                      - /url: Moodle/phpMoodleTemplate/
                  - listitem [ref=e436]:
                    - generic [ref=e437] [cursor=pointer]: Javascript
                    - navigation "Javascript" [ref=e439]:
                      - generic [ref=e440] [cursor=pointer]: Javascript
                      - list [ref=e442]:
                        - listitem [ref=e443]:
                          - link "General" [ref=e444] [cursor=pointer]:
                            - /url: Moodle/Javascript/phpMoodleJS/
                        - listitem [ref=e445]:
                          - link "Tools" [ref=e446] [cursor=pointer]:
                            - /url: Moodle/Javascript/phpMoodleJSTools/
                        - listitem [ref=e447]:
                          - link "Promises" [ref=e448] [cursor=pointer]:
                            - /url: Moodle/Javascript/phpMoodlePromises/
                        - listitem [ref=e449]:
                          - link "Modal Dialogues" [ref=e450] [cursor=pointer]:
                            - /url: Moodle/Javascript/phpMoodleModal/
                        - listitem [ref=e451]:
                          - link "AJAX" [ref=e452] [cursor=pointer]:
                            - /url: Moodle/Javascript/phpMoodleAJAX/
                  - listitem [ref=e453]:
                    - generic [ref=e454] [cursor=pointer]: APIs
                    - navigation "APIs" [ref=e456]:
                      - generic [ref=e457] [cursor=pointer]: APIs
                      - list [ref=e459]:
                        - listitem [ref=e460]:
                          - link "External Services" [ref=e461] [cursor=pointer]:
                            - /url: Moodle/phpMoodleServices/
                        - listitem [ref=e462]:
                          - link "Persistent API" [ref=e463] [cursor=pointer]:
                            - /url: Moodle/API/phpMoodlePersistent/
                        - listitem [ref=e464]:
                          - link "Exporter" [ref=e465] [cursor=pointer]:
                            - /url: Moodle/API/phpMoodleExporter/
                        - listitem [ref=e466]:
                          - link "Question API" [ref=e467] [cursor=pointer]:
                            - /url: Moodle/API/phpMoodleQuestion/
                        - listitem [ref=e468]:
                          - link "Data Manipulation API" [ref=e469] [cursor=pointer]:
                            - /url: Moodle/API/phpMoodleDM/
                        - listitem [ref=e470]:
                          - link "Tag API" [ref=e471] [cursor=pointer]:
                            - /url: Moodle/API/phpMoodleTag/
                        - listitem [ref=e472]:
                          - link "Access API" [ref=e473] [cursor=pointer]:
                            - /url: Moodle/API/phpMoodleAccess/
                        - listitem [ref=e474]:
                          - link "Groups API" [ref=e475] [cursor=pointer]:
                            - /url: Moodle/API/phpMoodleGroups/
                        - listitem [ref=e476]:
                          - link "Messaging API" [ref=e477] [cursor=pointer]:
                            - /url: Moodle/API/phpMoodleMessage/
                        - listitem [ref=e478]:
                          - link "Cache API" [ref=e479] [cursor=pointer]:
                            - /url: Moodle/API/phpMoodleCache/
                        - listitem [ref=e480]:
                          - link "Table API" [ref=e481] [cursor=pointer]:
                            - /url: Moodle/API/phpMoodleTable/
                        - listitem [ref=e482]:
                          - link "Forms API" [ref=e483] [cursor=pointer]:
                            - /url: Moodle/API/phpMoodleForms/
                  - listitem [ref=e484]:
                    - link "Security" [ref=e485] [cursor=pointer]:
                      - /url: Moodle/phpMoodleSecurity/
                  - listitem [ref=e486]:
                    - generic [ref=e487] [cursor=pointer]: Test Frameworks
                    - navigation "Test Frameworks" [ref=e489]:
                      - generic [ref=e490] [cursor=pointer]: Test Frameworks
                      - list [ref=e492]:
                        - listitem [ref=e493]:
                          - link "General" [ref=e494] [cursor=pointer]:
                            - /url: Moodle/phpMoodleTestFrameworks/
                        - listitem [ref=e495]:
                          - link "Unit Test" [ref=e496] [cursor=pointer]:
                            - /url: Moodle/phpMoodleToolsPHPUnit/
                        - listitem [ref=e497]:
                          - link "Behat" [ref=e498] [cursor=pointer]:
                            - /url: Moodle/phpMoodleBehat/
                  - listitem [ref=e499]:
                    - link "Debug" [ref=e500] [cursor=pointer]:
                      - /url: Moodle/phpMoodleDebug/
        - article [ref=e502]:
          - heading "Welcome to PHP Refresher" [level=1] [ref=e503]
          - blockquote [ref=e504]:
            - paragraph [ref=e505]:
              - strong [ref=e506]: "Last updated:"
              - text: April 6, 2026
              - strong [ref=e507]: "Minimum PHP Version:"
              - text: PHP 7.4+
              - strong [ref=e508]: "Status:"
              - text: Stable
          - paragraph [ref=e509]: Everyone can forget about grammar and vocabulary.
          - paragraph [ref=e510]: What is most important is to know where to look.
          - paragraph [ref=e511]: The key to becoming a proficient PHP developer is to keep learning and practicing regularly. With a strong foundation in the basics, a commitment to ongoing learning, and a willingness to experiment with new tools and technologies, you can refresh your PHP skills and take your programming career to the next level.
          - paragraph
          - generic [ref=e512]:
            - paragraph
            - table [ref=e515]:
              - rowgroup [ref=e516]:
                - row "Basic Topics Advanced Topics" [ref=e517]:
                  - columnheader "Basic Topics" [ref=e518]
                  - columnheader "Advanced Topics" [ref=e519]
              - rowgroup [ref=e520]:
                - row "Basics File Management" [ref=e521]:
                  - cell "Basics" [ref=e522]:
                    - link "Basics" [ref=e523] [cursor=pointer]:
                      - /url: phpRefresh/
                  - cell "File Management" [ref=e524]:
                    - link "File Management" [ref=e525] [cursor=pointer]:
                      - /url: Adv/phpFile/
                - row "Functions MySql" [ref=e526]:
                  - cell "Functions" [ref=e527]:
                    - link "Functions" [ref=e528] [cursor=pointer]:
                      - /url: Func/phpAll/
                  - cell "MySql" [ref=e529]:
                    - link "MySql" [ref=e530] [cursor=pointer]:
                      - /url: Adv/phpMySql/
                - row "Data Structures XML" [ref=e531]:
                  - cell "Data Structures" [ref=e532]:
                    - link "Data Structures" [ref=e533] [cursor=pointer]:
                      - /url: DS/phpArray/
                  - cell "XML" [ref=e534]:
                    - link "XML" [ref=e535] [cursor=pointer]:
                      - /url: Adv/phpXML/
                - row "Classes Ajax" [ref=e536]:
                  - cell "Classes" [ref=e537]:
                    - link "Classes" [ref=e538] [cursor=pointer]:
                      - /url: Classes/phpCls/
                  - cell "Ajax" [ref=e539]:
                    - link "Ajax" [ref=e540] [cursor=pointer]:
                      - /url: Adv/phpAjax/
            - paragraph
          - paragraph
          - paragraph [ref=e541]:
            - text: This material is a work in progress, so your feedback is welcome. The best way to provide that feedback is
            - link "to click here and create an issue in this GitHub repository" [ref=e542] [cursor=pointer]:
              - /url: https://github.com/ArceLopera/PHPRefresher/issues
            - text: .
    - contentinfo [ref=e543]:
      - navigation "Footer" [ref=e544]:
        - 'link "Next: Introduction" [ref=e545] [cursor=pointer]':
          - /url: getting-started-index/
          - generic [ref=e547]:
            - generic [ref=e548]: Next
            - text: Introduction
          - img [ref=e550]
      - generic [ref=e553]:
        - generic [ref=e554]:
          - generic [ref=e555]: Copyright © 2024
          - text: Made with
          - link "Material for MkDocs" [ref=e556] [cursor=pointer]:
            - /url: https://squidfunk.github.io/mkdocs-material/
        - generic [ref=e557]:
          - link "linkedin.com" [ref=e558] [cursor=pointer]:
            - /url: https://linkedin.com/in/carlos-arcelopera
            - img [ref=e559]
          - link "github.com" [ref=e561] [cursor=pointer]:
            - /url: https://github.com/ArceLopera
            - img [ref=e562]
          - link "www.youtube.com" [ref=e564] [cursor=pointer]:
            - /url: https://www.youtube.com/
            - img [ref=e565]
          - link [ref=e567] [cursor=pointer]:
            - /url: mailto:arcelopera.carlos@gmail.com
            - img [ref=e568]
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | 
  3   | test.describe('Responsive Design', () => {
  4   |   test('page renders on mobile (375px width)', async ({ page }) => {
  5   |     await page.setViewportSize({ width: 375, height: 812 });
  6   |     await page.goto('/');
  7   |     
  8   |     // Main content should still be accessible
  9   |     const mainContent = page.locator('main, article, .md-content');
  10  |     await expect(mainContent).toBeVisible();
  11  |     
  12  |     // No horizontal overflow
  13  |     const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
  14  |     expect(bodyWidth).toBeLessThanOrEqual(375 + 20);  // Allow small margin
  15  |   });
  16  | 
  17  |   test('page renders on tablet (768px width)', async ({ page }) => {
  18  |     await page.setViewportSize({ width: 768, height: 1024 });
  19  |     await page.goto('/');
  20  |     
  21  |     const mainContent = page.locator('main, article, .md-content');
> 22  |     await expect(mainContent).toBeVisible();
      |                               ^ Error: expect(locator).toBeVisible() failed
  23  |   });
  24  | 
  25  |   test('page renders on desktop (1280px width)', async ({ page }) => {
  26  |     await page.setViewportSize({ width: 1280, height: 800 });
  27  |     await page.goto('/');
  28  |     
  29  |     const mainContent = page.locator('main, article, .md-content');
  30  |     await expect(mainContent).toBeVisible();
  31  |   });
  32  | 
  33  |   test('navigation adapts to mobile', async ({ page }) => {
  34  |     await page.setViewportSize({ width: 375, height: 812 });
  35  |     await page.goto('/');
  36  |     
  37  |     const mobileMenuButton = page.locator('[aria-label*="menu"], .md-nav__button').first();
  38  |     const isMobileMenuVisible = await mobileMenuButton.isVisible().catch(() => false);
  39  |     
  40  |     // Either menu button exists or nav is visible
  41  |     const navVisible = await page.locator('.md-nav').isVisible().catch(() => false);
  42  |     expect(isMobileMenuVisible || navVisible).toBe(true);
  43  |   });
  44  | 
  45  |   test('code blocks are readable on mobile', async ({ page }) => {
  46  |     await page.setViewportSize({ width: 375, height: 812 });
  47  |     await page.goto('/PR/phpVar1/');
  48  |     
  49  |     const codeBlocks = await page.locator('pre').count();
  50  |     if (codeBlocks > 0) {
  51  |       const firstCodeBlock = page.locator('pre').first();
  52  |       const isVisible = await firstCodeBlock.isVisible();
  53  |       expect(isVisible).toBe(true);
  54  |       
  55  |       // Should have horizontal scroll if needed
  56  |       const scrollWidth = await firstCodeBlock.evaluate(el => el.scrollWidth);
  57  |       const clientWidth = await firstCodeBlock.evaluate(el => el.clientWidth);
  58  |       expect(clientWidth).toBeGreaterThan(0);
  59  |     }
  60  |   });
  61  | 
  62  |   test('tables are responsive', async ({ page }) => {
  63  |     await page.setViewportSize({ width: 375, height: 812 });
  64  |     await page.goto('/Classes/phpCls/');
  65  |     
  66  |     const tables = await page.locator('table').count();
  67  |     if (tables > 0) {
  68  |       const table = page.locator('table').first();
  69  |       await expect(table).toBeVisible();
  70  |     }
  71  |   });
  72  | 
  73  |   test('images scale appropriately', async ({ page }) => {
  74  |     await page.setViewportSize({ width: 375, height: 812 });
  75  |     await page.goto('/');
  76  |     
  77  |     const images = await page.locator('img').all();
  78  |     
  79  |     for (const img of images.slice(0, 3)) {
  80  |       const isVisible = await img.isVisible();
  81  |       if (isVisible) {
  82  |         const width = await img.boundingBox();
  83  |         expect(width.width).toBeLessThanOrEqual(375);
  84  |       }
  85  |     }
  86  |   });
  87  | 
  88  |   test('text is readable on mobile', async ({ page }) => {
  89  |     await page.setViewportSize({ width: 375, height: 812 });
  90  |     await page.goto('/');
  91  |     
  92  |     const bodyText = await page.locator('body').textContent();
  93  |     expect(bodyText).toBeTruthy();
  94  |     expect(bodyText.length).toBeGreaterThan(10);
  95  |   });
  96  | 
  97  |   test('buttons and links are touch-friendly', async ({ page }) => {
  98  |     await page.setViewportSize({ width: 375, height: 812 });
  99  |     await page.goto('/');
  100 |     
  101 |     const links = await page.locator('a').all();
  102 |     
  103 |     for (const link of links.slice(0, 5)) {
  104 |       const box = await link.boundingBox();
  105 |       if (box) {
  106 |         // Touch target should be at least 44x44px (mobile standard)
  107 |         expect(Math.max(box.width, box.height)).toBeGreaterThanOrEqual(30);
  108 |       }
  109 |     }
  110 |   });
  111 | 
  112 |   test('no layout shift on page load', async ({ page }) => {
  113 |     await page.setViewportSize({ width: 768, height: 1024 });
  114 |     await page.goto('/');
  115 |     
  116 |     const firstHeading = await page.locator('h1').first().boundingBox();
  117 |     expect(firstHeading).toBeTruthy();
  118 |     
  119 |     // Element should stay in place
  120 |     await page.waitForTimeout(1000);
  121 |     const secondMeasure = await page.locator('h1').first().boundingBox();
  122 |     expect(firstHeading.y).toBe(secondMeasure.y);
```