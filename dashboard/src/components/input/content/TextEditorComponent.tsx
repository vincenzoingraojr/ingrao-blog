import "./editor.css";
import type { ChangeEvent, HTMLProps, KeyboardEvent } from "react";
import { RemirrorJSON } from "remirror";
import {
    FunctionComponent,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import styled from "styled-components";
import {
    BoldExtension,
    CalloutExtension,
    ItalicExtension,
    LinkExtension,
    PlaceholderExtension,
    ShortcutsExtension,
    StrikeExtension,
    SubExtension,
    SupExtension,
    UnderlineExtension,
    HistoryExtension,
    HorizontalRuleExtension,
    HeadingExtension,
    createMarkPositioner,
    ShortcutHandlerProps,
    BulletListExtension,
    HardBreakExtension,
    OrderedListExtension,
} from "remirror/extensions";
import {
    CommandButton,
    FloatingToolbar,
    FloatingWrapper,
    Remirror,
    useActive,
    useAttrs,
    useChainedCommands,
    useCommands,
    useCurrentSelection,
    useExtensionEvent,
    useRemirror,
    useUpdateReason,
    OnChangeJSON,
} from "@remirror/react";
import { cx, htmlToProsemirrorNode } from "remirror";

export interface TextEditorComponentProps {
    field: any;
    form: any;
}

const EditorComponentContainer = styled.div`
    display: block;
    width: 100%;
`;

const EditorToolbar = styled.div`
    display: flex;
    flex-wrap: wrap;
    font-family: "Roboto Condensed", sans-serif;
`;

const EditorContainer = styled.div`
    display: block;
    font-family: "Source Serif Pro", serif;
`;

const BoldButton = () => {
    const commands = useCommands();
    const active = useActive(true);

    return (
        <button
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => commands.toggleBold()}
            className={cx(
                active.bold()
                    ? "remirror-button remirror-button-active"
                    : "remirror-button"
            )}
            type="button"
        >
            <b>B</b>
        </button>
    );
};

const ItalicButton = () => {
    const commands = useCommands();
    const active = useActive(true);
    return (
        <button
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => commands.toggleItalic()}
            className={cx(
                active.italic()
                    ? "remirror-button remirror-button-active"
                    : "remirror-button"
            )}
            type="button"
        >
            <i>I</i>
        </button>
    );
};

const UnderlineButton = () => {
    const commands = useCommands();
    const active = useActive(true);
    return (
        <button
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => commands.toggleUnderline()}
            className={cx(
                active.underline()
                    ? "remirror-button remirror-button-active"
                    : "remirror-button"
            )}
            type="button"
        >
            <u>U</u>
        </button>
    );
};

const StrikeButton = () => {
    const commands = useCommands();
    const active = useActive(true);
    return (
        <button
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => commands.toggleStrike()}
            className={cx(
                active.strike()
                    ? "remirror-button remirror-button-active"
                    : "remirror-button"
            )}
            type="button"
        >
            <s>S</s>
        </button>
    );
};

const SupButton = () => {
    const commands = useCommands();
    return (
        <button
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => commands.toggleSuperscript()}
            className="remirror-button"
            type="button"
        >
            X<sup>2</sup>
        </button>
    );
};

const SubButton = () => {
    const commands = useCommands();
    return (
        <button
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => commands.toggleSubscript()}
            className="remirror-button"
            type="button"
        >
            X<sub>2</sub>
        </button>
    );
};

const HorizontalRuleButton = () => {
    const commands = useCommands();
    return (
        <button
            onClick={() => commands.insertHorizontalRule()}
            type="button"
            className="remirror-button"
        >
            &mdash;
        </button>
    );
};

const HeadingButtons = () => {
    const commands = useCommands();
    const active = useActive(true);
    return (
        <>
            {[1, 2, 3, 4, 5, 6].map((level) => (
                <button
                    key={level}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => commands.toggleHeading({ level })}
                    className={cx(
                        active.heading({ level })
                            ? "remirror-button remirror-button-active heading"
                            : "remirror-button heading"
                    )}
                    type="button"
                >
                    H{level}
                </button>
            ))}
        </>
    );
};

const ListButtons = () => {
    const commands = useCommands();

    return (
        <>
            <button
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => commands.toggleBulletList()}
                type="button"
                className="remirror-button"
            >
                BL
            </button>
            <button
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => commands.toggleOrderedList()}
                type="button"
                className="remirror-button"
            >
                OL
            </button>
            <button
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => commands.liftListItemOutOfList()}
                type="button"
                className="remirror-button"
            >
                LIOF
            </button>
        </>
    );
};

function useLinkShortcut() {
    const [linkShortcut, setLinkShortcut] = useState<
        ShortcutHandlerProps | undefined
    >();
    const [isEditing, setIsEditing] = useState(false);

    useExtensionEvent(
        LinkExtension,
        "onShortcut",
        useCallback(
            (props) => {
                if (!isEditing) {
                    setIsEditing(true);
                }

                return setLinkShortcut(props);
            },
            [isEditing]
        )
    );

    return { linkShortcut, isEditing, setIsEditing };
}

function useFloatingLinkState() {
    const chain = useChainedCommands();
    const { isEditing, linkShortcut, setIsEditing } = useLinkShortcut();
    const { to, empty } = useCurrentSelection();

    const url = (useAttrs().link()?.href as string) ?? "";
    const [href, setHref] = useState<string>(url);

    const linkPositioner = useMemo(
        () => createMarkPositioner({ type: "link" }),
        []
    );

    const onRemove = useCallback(() => {
        return chain.removeLink().focus().run();
    }, [chain]);

    const updateReason = useUpdateReason();

    useLayoutEffect(() => {
        if (!isEditing) {
            return;
        }

        if (updateReason.doc || updateReason.selection) {
            setIsEditing(false);
        }
    }, [isEditing, setIsEditing, updateReason.doc, updateReason.selection]);

    useEffect(() => {
        setHref(url);
    }, [url]);

    const submitHref = useCallback(() => {
        setIsEditing(false);
        const range = linkShortcut ?? undefined;

        if (href === "") {
            chain.removeLink();
        } else {
            chain.updateLink({ href, auto: false }, range);
        }

        chain.focus(range?.to ?? to).run();
    }, [setIsEditing, linkShortcut, chain, href, to]);

    const cancelHref = useCallback(() => {
        setIsEditing(false);
    }, [setIsEditing]);

    const clickEdit = useCallback(() => {
        if (empty) {
            chain.selectLink();
        }

        setIsEditing(true);
    }, [chain, empty, setIsEditing]);

    return useMemo(
        () => ({
            href,
            setHref,
            linkShortcut,
            linkPositioner,
            isEditing,
            clickEdit,
            onRemove,
            submitHref,
            cancelHref,
        }),
        [
            href,
            linkShortcut,
            linkPositioner,
            isEditing,
            clickEdit,
            onRemove,
            submitHref,
            cancelHref,
        ]
    );
}

const DelayAutoFocusInput = ({
    autoFocus,
    ...rest
}: HTMLProps<HTMLInputElement>) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!autoFocus) {
            return;
        }

        const frame = window.requestAnimationFrame(() => {
            inputRef.current?.focus();
        });

        return () => {
            window.cancelAnimationFrame(frame);
        };
    }, [autoFocus]);

    return <input ref={inputRef} {...rest} />;
};

const FloatingLinkToolbar = () => {
    const {
        isEditing,
        linkPositioner,
        clickEdit,
        onRemove,
        submitHref,
        href,
        setHref,
        cancelHref,
    } = useFloatingLinkState();
    const active = useActive();
    const activeLink = active.link();
    const { empty } = useCurrentSelection();

    const handleClickEdit = useCallback(() => {
        clickEdit();
    }, [clickEdit]);

    const linkEditButtons = activeLink ? (
        <>
            <CommandButton
                commandName="updateLink"
                onSelect={handleClickEdit}
                icon="pencilLine"
                className="link-edit-button"
                enabled
            />
            <CommandButton
                commandName="removeLink"
                onSelect={onRemove}
                icon="linkUnlink"
                className="link-edit-button"
                enabled
            />
        </>
    ) : (
        <CommandButton
            commandName="updateLink"
            onSelect={handleClickEdit}
            icon="link"
            className="link-edit-button"
            enabled
        />
    );

    return (
        <>
            {!isEditing && <FloatingToolbar>{linkEditButtons}</FloatingToolbar>}
            {!isEditing && empty && (
                <FloatingToolbar positioner={linkPositioner}>
                    {linkEditButtons}
                </FloatingToolbar>
            )}

            <FloatingWrapper
                positioner="always"
                placement="bottom"
                enabled={isEditing}
                renderOutsideEditor
            >
                <DelayAutoFocusInput
                    style={{ zIndex: 20 }}
                    autoFocus
                    placeholder="Enter a valid link"
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setHref(event.target.value)
                    }
                    value={href}
                    onKeyPress={(event: KeyboardEvent<HTMLInputElement>) => {
                        const { code } = event;

                        if (code === "Enter") {
                            submitHref();
                        }

                        if (code === "Escape") {
                            cancelHref();
                        }
                    }}
                />
            </FloatingWrapper>
        </>
    );
};

const TextEditorComponent: FunctionComponent<TextEditorComponentProps> = ({
    field,
    form,
}) => {
    const { manager, state } = useRemirror({
        extensions: () => [
            new BoldExtension(),
            new ItalicExtension(),
            new LinkExtension({ autoLink: true }),
            new PlaceholderExtension({ placeholder: "Post content" }),
            new ShortcutsExtension(),
            new StrikeExtension(),
            new SubExtension(),
            new SupExtension(),
            new UnderlineExtension(),
            new HistoryExtension(),
            new HorizontalRuleExtension(),
            new HeadingExtension(),
            new BulletListExtension(),
            new HardBreakExtension(),
            new OrderedListExtension(),
            new CalloutExtension({ defaultType: "warn" }),
        ],
        selection: "start",
        stringHandler: htmlToProsemirrorNode,
    });

    const [initialContent] = useState<RemirrorJSON | undefined>(() => {
        const content = field.value;
        return content ? JSON.parse(content) : state;
    });

    const handleEditorChange = useCallback(
        (json: RemirrorJSON) => {
            form.setFieldValue(field.name, JSON.stringify(json));
        },
        [form, field.name]
    );

    return (
        <EditorComponentContainer>
            <div className="remirror-theme">
                <EditorContainer>
                    <Remirror
                        manager={manager}
                        initialContent={initialContent}
                        autoRender="end"
                    >
                        <OnChangeJSON onChange={handleEditorChange} />
                        <EditorToolbar>
                            <BoldButton />
                            <ItalicButton />
                            <UnderlineButton />
                            <StrikeButton />
                            <SupButton />
                            <SubButton />
                            <HorizontalRuleButton />
                            <HeadingButtons />
                            <ListButtons />
                        </EditorToolbar>
                        <FloatingLinkToolbar />
                    </Remirror>
                </EditorContainer>
            </div>
        </EditorComponentContainer>
    );
};

export default TextEditorComponent;
